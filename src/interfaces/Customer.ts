import type Field from "./Field";

export default interface Customer extends Field {
  id: string;
  name: string;
  phone_number: string;
  email: string;
  address: string;
}
