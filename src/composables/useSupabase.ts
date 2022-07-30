import type Field from "@/interfaces/Field";
import { supabase } from "@/supabase";
import { ref } from "vue";
import { onMounted } from "vue";
import { v4 as uuid } from "uuid";

const useSupabase = (table: string) => {
  const fields = ref<Field[]>([]);

  onMounted(async () => {
    const { data } = await supabase.from<Field>(table).select("*");
    fields.value = data ?? [];
  });

  const add = async (values: Partial<unknown>) => {
    const newField = { id: uuid(), ...values };
    fields.value.push(newField);
    await supabase.from(table).insert(newField);
  };

  const del = async (id: string) => {
    fields.value = fields.value.filter((field) => field.id != id);
    await supabase.from(table).delete().match({ id });
  };

  const update = async (id: string, values: Partial<unknown>) => {
    fields.value = fields.value.map((field) =>
      field.id == id ? { id, ...values } : field
    );
    await supabase.from(table).update(values).match({ id });
  };

  return { add, update, del, fields };
};

export default useSupabase;
