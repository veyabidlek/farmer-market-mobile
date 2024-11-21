// mockData.js
export const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Tomatoes",
    category: "Vegetables",
    price: 2.5,
    quantity: 15,
    description: "Fresh red tomatoes.",
    farm_location: "Farm A",
    images: ["https://images.unsplash.com/photo-1567306226416-28f0efdc88ce"],
    farmer: {
      id: 1,
      farm_address: "123 Farm Lane, Farmville",
      farm_size: 50,
      user: {
        name: "John Doe",
        email: "john@example.com",
        id: 1,
        is_admin: false,
        is_buyer: false,
        is_farmer: true,
      },
    },
  },
  {
    id: 2,
    name: "Apple Seeds",
    category: "Seeds",
    price: 1.0,
    quantity: 5, // Low stock
    description: "High-quality apple seeds.",
    farm_location: "Farm B",
    images: ["https://images.unsplash.com/photo-1587300003388-59208cc962cb"],
    farmer: {
      id: 2,
      farm_address: "456 Orchard Road, Fruitville",
      farm_size: 30,
      user: {
        name: "Jane Smith",
        email: "jane@example.com",
        id: 2,
        is_admin: false,
        is_buyer: false,
        is_farmer: true,
      },
    },
  },
  // Add more mock products as needed
];
