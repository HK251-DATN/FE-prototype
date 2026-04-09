export const mockCartData = {
  cart_id: "cart-001",
  created_at: new Date().toISOString(),
  items: [
    {
      id: "item-1",
      product_id: 1,
      product_name: "Cải thìa xanh",
      quantity: 2,
      is_selected: true,
      price: 12000,
      image: "https://placehold.co/100x100",
    },
    {
      id: "item-2",
      product_id: 2,
      product_name: "Xà lách tươi",
      quantity: 1,
      is_selected: true,
      price: 18000,
      image: "https://placehold.co/100x100",
    },
  ],
  subtotal: 42000,
  total_items: 3,
};

export const mockOrders = [
  {
    order_id: "ord-001",
    order_number: "ORD-2026-001",
    total_amount: 42000,
    status: "PENDING",
    created_at: "2026-04-03",
  },
];
