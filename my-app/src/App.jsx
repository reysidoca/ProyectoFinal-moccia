import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import NavBar from "./components/NavBar";
import ItemListContainer from "./containers/ItemListContainer";
import ItemDetailContainer from "./containers/ItemDetailContainer";
import Checkout from "./components/Checkout";
import CartView from "./components/CartView";

export default function App() {
  return (
    <CartProvider>
      <>
        <NavBar />
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/category/:id" element={<ItemListContainer />} />
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<CartView />} />  
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </>
    </CartProvider>
  );
}
