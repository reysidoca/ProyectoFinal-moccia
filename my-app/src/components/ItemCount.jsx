 import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function ItemCount({ stock = 10, initial = 1, onAdd }) {
  const navigate = useNavigate(); // <-- con paréntesis
  const [qty, setQty] = useState(initial);

  const dec = () => setQty(q => Math.max(1, q - 1));
  const inc = () => setQty(q => Math.min(stock, q + 1));

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 12 }}>
      <button onClick={dec} disabled={qty <= 1}>-</button>
      <span>{qty}</span>
      <button onClick={inc} disabled={qty >= stock}>+</button>

      <button onClick={() => onAdd?.(qty)} disabled={stock === 0}>
        Agregar
      </button>

      <button className="w-50 mt-5" onClick={() => navigate("/checkout")}>
        Ir a Checkout
      </button>
    </div>
  );
}

ItemCount.propTypes = {
  stock: PropTypes.number,
  initial: PropTypes.number,
  onAdd: PropTypes.func,
};