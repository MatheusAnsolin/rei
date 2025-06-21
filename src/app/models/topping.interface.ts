export interface Topping {
  id: number;
  name: string;
}

export interface Extra extends Topping {
  price: number;
}
