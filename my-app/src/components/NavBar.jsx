import { Link, NavLink } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getCategories } from "../firebase/db";
import { CartContext } from "../context/CartContext"; // o useCart si lo exportaste

export default function NavBar() {
  const [categories, setCategories] = useState([]);
  const { cart } = useContext(CartContext); // o const { cart } = useCart();
  const totalItems = cart?.reduce((a, p) => a + Number(p.count), 0) ?? 0;

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  const active = ({ isActive }) => ({ textDecoration: isActive ? "underline" : "none" });

  return (
    <nav style={{ display: "flex", gap: 16, alignItems: "center", padding: 12, borderBottom: "1px solid #eee", flexWrap: "wrap" }}>
      <Link to="/" style={{ fontWeight: 700 }}>MiTienda</Link>

      <NavLink to="/catalog" style={active}>Catálogo</NavLink>

      {categories.map((cat) => {
        const label = cat.categoryName;
        const path  = encodeURIComponent(label);
        return (
          <NavLink key={cat.id} to={`/category/${path}`} style={active}>
            {label}
          </NavLink>
        );
      })}

      <span style={{ flex: 1 }} />
      <NavLink to="/cart" style={active}>
        🛒 Carrito {totalItems > 0 && (
          <span style={{
            marginLeft: 6, padding: "2px 8px", borderRadius: 999,
            background: "#111", color: "#fff", fontSize: 12
          }}>{totalItems}</span>
        )}
      </NavLink>
    </nav>
  );
}