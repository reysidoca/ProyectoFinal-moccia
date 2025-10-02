import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts, getProductsByCategory } from "../firebase/db";
import Loader from "../components/Loader.jsx";
import ProductCard from "../components/ProductCard.jsx";

export default function ItemListContainer() {
  const { id, cid } = useParams();
  const category = cid ?? id ?? null;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const p = category ? getProductsByCategory(category) : getProducts();
    p.then(setProducts).catch(setError).finally(() => setLoading(false));
  }, [category]);

  if (loading) return <Loader />;
  if (error) return <p style={{ padding: 16 }}>Error: {error.message}</p>;

  return (
    <section style={{ padding: 16 }}>
      <h2 style={{ marginBottom: 12 }}>
        {category ? `Categoría: ${category}` : "Productos"}
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
