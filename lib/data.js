// productsData.js

export const products = [
  {
    id: 1,
    name: "Producto A",
    image: "",
    price: 20.99,
    sales: 10
  },
  {
    id: 2,
    name: "Producto B",
    image: "",
    price: 15.49,
    sales: 15
  },
  {
    id: 3,
    name: "Producto C",
    image: "",
    price: 30.75,
    sales: 20
  },
  {
    id: 4,
    name: "Producto D",
    image: "",
    price: 25.00,
    sales: 12
  }
];
// salesData.js

export const sales = [
  {
    id: 1,
    product: "Producto A",
    quantity: 3,
    totalPrice: 62.97
  },
  {
    id: 2,
    product: "Producto C",
    quantity: 5,
    totalPrice: 153.75
  },
  {
    id: 3,
    product: "Producto B",
    quantity: 2,
    totalPrice: 30.98
  },
  {
    id: 4,
    product: "Producto D",
    quantity: 4,
    totalPrice: 100.00
  }
];

export const user_sales = [
  {
    id: 1,
    product: 'Product 1',
    price: 100,
    date: '2024-04-27',
  },
  {
    id: 2,
    product: 'Product 2',
    price: 150,
    date: '2024-04-26',
  },
  {
    id: 3,
    product: 'Product 3',
    price: 200,
    date: '2024-04-25',
  },
];

export const user_repairs = [
  {
    id: 1,
    item: 'Item 1',
    description: 'Description 1',
    date: '2024-04-27',
  },
  {
    id: 2,
    item: 'Item 2',
    description: 'Description 2',
    date: '2024-04-26',
  },
  {
    id: 3,
    item: 'Item 3',
    description: 'Description 3',
    date: '2024-04-25',
  },
];