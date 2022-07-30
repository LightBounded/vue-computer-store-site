import type Field from "./Field";

export default interface Category extends Field {
  name: string;
  description: string;
}
