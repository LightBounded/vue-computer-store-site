<script setup lang="ts">
import useSupabase from "@/composables/useSupabase";
import type Product from "@/interfaces/Product";
import type Category from "@/interfaces/Category";
import type Supplier from "@/interfaces/Supplier";
import Delete from "@/components/icons/Delete.vue";
import Edit from "@/components/icons/Edit.vue";
import Modal from "@/components/Modal.vue";
import Form from "@/components/Form.vue";
import Field from "@/components/Field.vue";
import { ref } from "vue";

const { fields: products, add, del, update } = useSupabase("products");
const { fields: categories } = useSupabase("categories");
const { fields: suppliers } = useSupabase("suppliers");
const isOpen = ref(false);
const selectedProduct = ref<Product | null>(null);

const fields = [
  {
    label: "Name",
    name: "name",
    element: "input",
    type: "text",
  },
  {
    label: "Price",
    name: "price",
    element: "input",
    type: "number",
  },
  {
    label: "Category",
    name: "category",
    element: "select",
  },
  {
    label: "Supplier",
    name: "supplier",
    element: "select",
  },
];
</script>

<template>
  <div class="overflow-x-auto px-2 pb-2">
    <button class="btn mb-2" @click="isOpen = true">Add Product</button>
    <Modal
      :is-open="isOpen"
      @close="
        isOpen = false;
        selectedProduct &&= null;
      "
    >
      <div class="mb-2 text-center text-lg font-medium uppercase">
        {{ selectedProduct ? "Edit Product" : "Add Product" }}
      </div>
      <Form
        @submit="
          selectedProduct ? update(selectedProduct.id, $event) : add($event);
          isOpen = false;
        "
      >
        <div class="form-control" v-for="field in fields" :key="field.name">
          <label :for="field.name" class="label">
            <span class="label-text">{{ field.label }}</span>
          </label>
          <Field
            :id="field.name"
            :name="field.name"
            :element="field.element"
            :type="field.type"
            :placeholder="field.element !== 'select' ? field.label : null"
            :value="selectedProduct?.[field.name]"
          >
            <template v-if="field.name == 'category'">
              <option value="" selected>Select a category</option>
              <option
                v-for="(category, i) in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </template>
            <template v-else-if="field.name == 'supplier'">
              <option value="" selected>Select a supplier</option>
              <option
                v-for="supplier in suppliers"
                :key="supplier.id"
                :value="supplier.id"
              >
                {{ supplier.name }}
              </option>
            </template>
          </Field>
        </div>
        <div class="modal-action">
          <button class="btn btn-primary">Submit</button>
          <button class="btn btn-ghost" type="button" @click="isOpen = false">
            Close
          </button>
        </div>
      </Form>
    </Modal>
    <table  class="table table-compact w-full">
      <thead>
        <tr>
          <th></th>
          <th v-for="field in fields" :key="field.name">{{ field.label }}</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, i) in (products as Product[])" :key="product.id">
          <td>{{ i }}</td>
          <td v-for="field in fields" :key="field.name">
            <span v-if="field.name == 'category'">{{
              ((categories.filter(
                (category) => category.id == product?.[field.name]
              )[0]) as Category).name
            }}</span>
            <span v-else-if="field.name == 'supplier'">
              {{
              ((suppliers.filter(
                (supplier) => supplier.id == product?.[field.name]
              )[0]) as Supplier).name
              }}
            </span>
            <span v-else>{{ product?.[field.name] }}</span>
          </td>
          <td class="flex gap-2">
            <button class="btn btn-sm" @click="del(product.id)">
              <Delete />
            </button>
            <button
              class="btn btn-sm"
              @click="
                isOpen = true;
                selectedProduct = product;
              "
            >
              <Edit />
            </button>
          </td>
        </tr>
      </tbody>

    </table>
  </div>
</template>
