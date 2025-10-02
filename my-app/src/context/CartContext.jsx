// src/context/CartContext.jsx
import { createContext, useContext, useMemo, useState } from "react";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]); // [{id, title/name, price, count, image?}]

  // suma o resta qty; si queda <=0, elimina el item
  const addItem = (product, qty = 1) => {
    setCart((prev) => {
      const id = String(product.id);
      const idx = prev.findIndex((p) => String(p.id) === id);

      if (idx >= 0) {
        const next = [...prev];
        const newCount = next[idx].count + Number(qty);
        if (newCount <= 0) {
          // si bajó a 0 o menos, lo sacamos del carrito
          return next.filter((p) => String(p.id) !== id);
        }
        next[idx] = { ...next[idx], count: newCount };
        return next;
      }

      // si el producto no estaba y la qty es >0, lo agregamos
      if (qty > 0) {
        return [
          ...prev,
          {
            id,
            title: product.title ?? product.name ?? "Producto",
            price: Number(product.price ?? 0),
            count: Number(qty),
            image: product.image ?? product.thumbnail ?? "",
          },
        ];
      }

      // si no estaba y qty <= 0, no hacemos nada
      return prev;
    });
  };

  const removeItem = (id) =>
    setCart((prev) => prev.filter((p) => String(p.id) !== String(id)));

  const clearCart = () => setCart([]);

  const getTotal = () =>
    cart.reduce((acc, it) => acc + Number(it.price) * Number(it.count), 0);

  // total de unidades para el badge del carrito
  const getCount = () => cart.reduce((acc, it) => acc + Number(it.count), 0);

  const value = useMemo(
    () => ({ cart, addItem, removeItem, clearCart, getTotal, getCount }),
    [cart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
