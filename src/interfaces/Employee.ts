import type Field from "./Field";

export default interface Employee extends Field {
  name: string;
  phone_number: string;
  email: string;
  address: string;
}
