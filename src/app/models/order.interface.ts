import { CartItem } from "./cart-item.interface";

export interface Order {
  id?: number; // O ID será gerado pelo json-server
  items: CartItem[];
  grandTotal: number;
  orderDate: Date;
  status: string;
}
