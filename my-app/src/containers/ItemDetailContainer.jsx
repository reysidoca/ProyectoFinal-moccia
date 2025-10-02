import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemCount from "../components/ItemCount.jsx";
import { getItem } from "../firebase/db";
import { useCart } from "../context/CartContext";

export default function ItemDetailContainer() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    setItem(null);
    getItem(id).then(setItem).catch(console.error);
  }, [id]);

  if (!item) return <div style={{ padding: 16 }}>Cargando...</div>;

  const title = item.title ?? item.name ?? "Producto";
  const img   = item.image ?? item.thumbnail ?? "";
  const price = Number(item.price ?? 0);
  const stock = Number(item.stock ?? 0);

  const handleAdd = (qty) => {
    addItem(item, qty); // guarda en CartContext
  };

  return (
    <section style={{ padding: 16, display: "grid", gap: 16 }}>
      <h2>{title}</h2>
      {img && <img src={img} alt={title} style={{ maxWidth: 360 }} />}
      <div>Precio: <b>${price}</b></div>
      <div>Stock: {stock}</div>
      <ItemCount stock={stock} initial={1} onAdd={handleAdd} />
    </section>
  );
}
