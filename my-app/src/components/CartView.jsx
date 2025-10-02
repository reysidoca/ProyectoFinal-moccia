// src/components/CartView.jsx
import { useContext } from "react";
import { useNavigate } from "react-router-dom";   
import { CartContext } from "../context/CartContext";

export default function CartView() {
  const navigate = useNavigate();              
  const { cart, addItem, removeItem, clearCart, getTotal } = useContext(CartContext);

  if (!cart?.length) {
    return (
      <section style={{ padding: 16 }}>
        <h2>Carrito</h2>
        <p>No tenés productos en el carrito.</p>
        <button onClick={() => navigate("/")}>Ir a comprar</button>
      </section>
    );
  }

  return (
    <section style={{ padding: 16 }}>
      <h2>Carrito</h2>

      <div style={{ display: "grid", gap: 12 }}>
        {cart.map((p) => (
          <article
            key={p.id}
            style={{
              display: "grid",
              gridTemplateColumns: "80px 1fr auto auto auto",
              gap: 12,
              alignItems: "center",
              border: "1px solid #eee",
              borderRadius: 12,
              padding: 12,
              background: "#fff",
            }}
          >
            {p.image ? (
              <img
                src={p.image}
                alt={p.title}
                style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }}
              />
            ) : (
              <div style={{ width: 80, height: 80, background: "#f3f3f3", borderRadius: 8 }} />
            )}

            <div>
              <div style={{ fontWeight: 600 }}>{p.title}</div>
              <small>${p.price} c/u</small>
            </div>

            <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center" }}>
              <button onClick={() => addItem({ ...p }, -1)} disabled={p.count <= 1}>-</button>
              <span>{p.count}</span>
              <button onClick={() => addItem({ ...p }, +1)}>+</button>
            </div>

            <div style={{ fontWeight: 700 }}>${(p.price * p.count).toFixed(2)}</div>

            <button onClick={() => removeItem(p.id)} style={{ color: "#a00" }}>
              Quitar
            </button>
          </article>
        ))}
      </div>

      <div style={{ marginTop: 16, display: "flex", gap: 12, alignItems: "center", justifyContent: "flex-end" }}>
        <div style={{ fontSize: 18 }}>
          Total: <b>${Number(getTotal?.() ?? 0).toFixed(2)}</b>
        </div>
        <button onClick={() => clearCart?.()} style={{ background: "#eee" }}>Vaciar</button>
        <button onClick={() => navigate("/checkout")}>Ir a Checkout</button>
      </div>
    </section>
  );
}
