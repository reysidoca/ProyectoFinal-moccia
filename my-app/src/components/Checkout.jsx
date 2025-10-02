import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";         // 👈 agregado
import { CartContext } from "../context/CartContext";
import { createOrder } from "../firebase/db";

export default function Checkout() {
  const navigate = useNavigate();                       // 👈 agregado
  const { cart = [], getTotal, clearCart } = useContext(CartContext) ?? {};
  const total = typeof getTotal === "function"
    ? getTotal()
    : cart.reduce((acc, it) => acc + Number(it.price) * Number(it.count), 0);

  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState("");

  // si el carrito está vacío, mostrar aviso
  useEffect(() => {
    if (!cart.length && !orderId) setError("Tu carrito está vacío.");
  }, [cart.length, orderId]);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // validación básica
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError("Completá todos los campos.");
      return;
    }
    if (!cart.length) {
      setError("Tu carrito está vacío.");
      return;
    }

    setLoading(true); setOrderId("");

    try {
      const id = await createOrder({
        cart,
        buyer: {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
        },
      });
      setOrderId(id);
      clearCart?.();

      // redirige a la home después de mostrar el ID
      setTimeout(() => navigate("/"), 2500);
    } catch (err) {
      if (err?.code === "out-of-stock") {
        const detalle = err.details
          .map(d => `${d.title ?? d.id}: disp ${d.available ?? 0} / pediste ${d.requested ?? "?"}`)
          .join(" | ");
        setError(`Sin stock: ${detalle}`);
      } else {
        setError(err?.message ?? "Error al generar la orden.");
      }
    } finally {
      setLoading(false);
    }
  };

  // éxito: muestra ID + botón para volver ya
  if (orderId) {
    return (
      <div style={{ padding: 20 }}>
        <h2>¡Gracias por tu compra!</h2>
        <p>Tu número de orden es: <b>{orderId}</b></p>
        <p>Te redirigimos al inicio…</p>
        <button onClick={() => navigate("/")}>Volver ahora</button>
      </div>
    );
  }

  // carrito vacío
  if (!cart.length) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Checkout</h2>
        <p>{error || "Tu carrito está vacío."}</p>
        <button onClick={() => navigate("/")}>Ir a comprar</button>
      </div>
    );
  }

  // formulario
  return (
    <div style={{ padding: 20, maxWidth: 480 }}>
      <h2>Checkout</h2>
      <p>Ítems: <b>{cart.length}</b> — Total: <b>${Number(total).toFixed(2)}</b></p>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <input name="name"  placeholder="Nombre"  value={form.name}  onChange={onChange} required />
        <input name="email" placeholder="Email"   value={form.email} onChange={onChange} type="email" required />
        <input name="phone" placeholder="Teléfono" value={form.phone} onChange={onChange} type="tel" required />
        <button type="submit" disabled={loading}>
          {loading ? "Generando orden..." : "Confirmar compra"}
        </button>
      </form>

      {error && (
        <p style={{ marginTop: 12, color: "crimson" }}>
          <b>Error:</b> {error}
        </p>
      )}
    </div>
  );
}
