import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  //  agregados para órdenes
  addDoc,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { app } from "./config";

const db = getFirestore(app);

// 
export const getProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  const products = [];
  querySnapshot.forEach((d) => {
    products.push({ ...d.data(), id: d.id });
  });
  return products;
};

export const getCategories = async () => {
  const querySnapshot = await getDocs(collection(db, "categories"));
  const categories = [];
  querySnapshot.forEach((d) => {
    categories.push({ ...d.data(), id: d.id });
  });
  return categories;
};

export const getProductsByCategory = async (category) => {
  const q = query(collection(db, "products"), where("category", "==", category));
  const products = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((d) => {
    products.push({ ...d.data(), id: d.id });
  });
  return products;
};

export const getItem = async (id) => {
  const ref = doc(db, "products", id);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    return { ...snap.data(), id: snap.id };
  } else {
    console.log("No such document!");
    return null;
  }
};

// ----------------- Nueva: crear orden con control de stock -----------------
/**
 * Crea una orden en "orders" con formato:
 * { buyer:{name,phone,email}, items:[{id,title,quantity,price}], total, date }
 * Controla stock en "products" (campo 'stock') y descuenta con writeBatch.
 * Si falta stock -> lanza error { code:'out-of-stock', details:[...] }
 */
export async function createOrder({ cart, buyer }) {
  if (!Array.isArray(cart) || cart.length === 0) {
    throw new Error("El carrito está vacío.");
  }

  // Mapeo de items para la orden
  const items = cart.map((it) => ({
    id: String(it.id),
    title: it.title ?? it.name ?? "Producto",
    quantity: Number(it.count),
    price: Number(it.price),
  }));

  const total = cart.reduce(
    (acc, it) => acc + Number(it.price) * Number(it.count),
    0
  );

  // Control de stock + batch
  const batch = writeBatch(db);
  const outOfStock = [];

  await Promise.all(
    cart.map(async (it) => {
      const ref = doc(db, "products", String(it.id));
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        outOfStock.push({ id: it.id, title: it.title ?? it.name, reason: "no existe" });
        return;
      }

      const current = Number(snap.data()?.stock ?? 0);
      const needed = Number(it.count);

      if (current >= needed) {
        batch.update(ref, { stock: current - needed });
      } else {
        outOfStock.push({
          id: it.id,
          title: it.title ?? it.name,
          available: current,
          requested: needed,
        });
      }
    })
  );

  if (outOfStock.length) {
    const err = new Error("Sin stock suficiente");
    err.code = "out-of-stock";
    err.details = outOfStock;
    throw err;
  }

  // Inserto la orden
  const ordersRef = collection(db, "orders");
  const docRef = await addDoc(ordersRef, {
    buyer,            // { name, phone, email }
    items,            // [{id,title,quantity,price}]
    total,
    date: serverTimestamp(),
  });

  // Confirmo el descuento de stock
  await batch.commit();

  return docRef.id; 
}
