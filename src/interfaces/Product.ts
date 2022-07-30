import type Field from "./Field";

export default interface Product extends Field {
  name: string;
  price: number;
  category: string;
  supplier: string;
}
