import { Product } from "./product.interface";
import { Extra, Topping } from "./topping.interface";

export interface CartItem {
  product: Product;
  selectedCalda: Topping | null;
  selectedExtras: Map<number, { extra: Extra, quantity: number }>;
  selectedAcompanhamentos: Map<number, { topping: Topping, quantity: number }>;
  totalPrice: number;
}
