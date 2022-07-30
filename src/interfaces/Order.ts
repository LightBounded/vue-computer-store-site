import type Field from "./Field";

export default interface Order extends Field {
  customer: string;
  product: string;
  employee: string;
  shipper: string;
}
