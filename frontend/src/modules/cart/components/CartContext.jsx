import { createContext, useContext, useState, useCallback } from "react";

// ─────────────────────────────────────────────
// CartContext — shared cart state
// Replace API_* functions with real API calls
// ─────────────────────────────────────────────

const CartContext = createContext(null);

// ── MOCK API helpers (swap with real fetch calls) ──
const API_addToCart = async (product, quantity) => {
  // POST /api/cart  { productId, quantity }
  return { success: true };
};
const API_updateCartItem = async (cartItemId, quantity) => {
  // PATCH /api/cart/:cartItemId  { quantity }
  return { success: true };
};
const API_removeCartItem = async (cartItemId) => {
  // DELETE /api/cart/:cartItemId
  return { success: true };
};
const API_applyCoupon = async (code) => {
  // POST /api/cart/coupon  { code }
  const valid = code.toUpperCase() === "SAVE10";
  return valid ? { discount: 10, label: "Giảm $10" } : null;
};

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [coupon, setCoupon] = useState(null);
  const [loading, setLoading] = useState(false);

  const addToCart = useCallback(async (product, quantity) => {
    await API_addToCart(product, quantity);
    setItems((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i,
        );
      }
      return [
        ...prev,
        {
          cartItemId: `cart-${product.id}-${Date.now()}`,
          id: product.id,
          name: product.name,
          price: product.salePrice,
          image: product.images?.[0] ?? "",
          quantity,
        },
      ];
    });
  }, []);

  const updateQuantity = useCallback(async (cartItemId, quantity) => {
    if (quantity < 1) return;
    await API_updateCartItem(cartItemId, quantity);
    setItems((prev) =>
      prev.map((i) => (i.cartItemId === cartItemId ? { ...i, quantity } : i)),
    );
  }, []);

  const removeItem = useCallback(async (cartItemId) => {
    await API_removeCartItem(cartItemId);
    setItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  }, []);

  const applyCoupon = useCallback(async (code) => {
    setLoading(true);
    const result = await API_applyCoupon(code);
    setCoupon(result);
    setLoading(false);
    return result;
  }, []);

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const discount = coupon?.discount ?? 0;
  const shipping = subtotal > 0 ? 0 : 0; // Free shipping
  const total = subtotal - discount + shipping;

  return (
    <CartContext.Provider
      value={{
        items,
        coupon,
        loading,
        subtotal,
        discount,
        shipping,
        total,
        addToCart,
        updateQuantity,
        removeItem,
        applyCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
