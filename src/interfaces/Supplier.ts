import type Field from "./Field";

export default interface Supplier extends Field {
  name: string;
  country: string;
  phone_number: string;
  address: string;
}
