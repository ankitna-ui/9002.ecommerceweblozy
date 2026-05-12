export interface Product {
  id: string;
  slug: string;
  name: string;
  model: string;
  price: number;
  category: string;
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock" | "Pre-order";
  stockQuantity: number;
  rating: number;
  reviewCount: number;
  shortDescription: string;
  longDescription: string;
  specifications: Record<string, string>;
  features: string[];
  applications: string[];
  imageId: string;
  galleryImages: string[];
  downloads: { name: string; size: string; url: string }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  company?: string;
  vatNumber?: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  paymentMethod: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered";
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "customer";
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}
