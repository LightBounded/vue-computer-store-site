import type Field from "./Field";

export default interface Shipper extends Field {
  name: string;
  phone_number: string;
  address: string;
}
