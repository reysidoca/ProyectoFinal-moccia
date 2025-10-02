import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const title = product.title ?? product.name ?? "Producto";
  const img   = product.image ?? product.thumbnail ?? "";
  const price = Number(product.price ?? 0);

  return (
    <article
      style={{
        border: "1px solid #ddd",
        borderRadius: 12,
        overflow: "hidden",
        background: "#fff",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {img ? (
        <img
          src={img}
          alt={title}
          style={{ width: "100%", height: 160, objectFit: "cover" }}
        />
      ) : (
        <div style={{ height: 160, background: "#f3f3f3" }} />
      )}

      <div style={{ padding: 12, display: "grid", gap: 8 }}>
        <h3 style={{ margin: 0, fontSize: 16 }}>{title}</h3>
        <div style={{ fontWeight: 700 }}>${price}</div>
        {"stock" in product && (
          <small style={{ color: "#555" }}>Stock: {product.stock}</small>
        )}

        <button
          onClick={() => navigate(`/item/${product.id}`)}
          style={{ marginTop: 6 }}
        >
          Ver detalle
        </button>
      </div>
    </article>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id:    PropTypes.string.isRequired,
    name:  PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    stock: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired
};
