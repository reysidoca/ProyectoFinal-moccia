import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const title = product.title ?? product.name ?? "Producto";
  const img   = product.image ?? product.thumbnail ?? "";
  const price = Number(product.price ?? 0);

  return (
    <article className="card h-100">
      {img ? (
        <img
          src={img}
          alt={title}
          className="card-img-top"
          style={{ height: 180, objectFit: "cover" }}
        />
      ) : (
        <div className="card-img-top bg-light" style={{ height: 180 }} />
      )}

      <div className="card-body d-grid gap-2">
        <h3 className="h6 mb-1">{title}</h3>
        <div className="fw-bold">${price}</div>

        {"stock" in product && (
          <small className="text-muted">Stock: {product.stock}</small>
        )}

        <button
          className="btn btn-primary mt-2"
          onClick={() => navigate(`/item/${product.id}`)}
        >
          Ver detalle
        </button>
      </div>
    </article>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id:    PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name:  PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    stock: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    thumbnail: PropTypes.string,
  }).isRequired
};
