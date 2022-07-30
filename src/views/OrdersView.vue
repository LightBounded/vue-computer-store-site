<script setup lang="ts">
import useSupabase from "@/composables/useSupabase";
import type Order from "@/interfaces/Order";
import type Customer from "@/interfaces/Order";
import type Product from "@/interfaces/Product";
import type Employee from "@/interfaces/Employee";
import type Shipper from "@/interfaces/Shipper";
import Delete from "@/components/icons/Delete.vue";
import Edit from "@/components/icons/Edit.vue";
import Modal from "@/components/Modal.vue";
import Form from "@/components/Form.vue";
import Field from "@/components/Field.vue";
import { ref } from "vue";

const { fields: orders, add, del, update } = useSupabase("orders");
const { fields: customers } = useSupabase("customers");
const { fields: products } = useSupabase("products");
const { fields: employees } = useSupabase("employees");
const { fields: shippers } = useSupabase("shippers");
const isOpen = ref(false);
const selectedOrder = ref<Order | null>(null);

const fields = [
  {
    label: "Customer",
    name: "customer",
    element: "select",
  },
  {
    label: "Product",
    name: "product",
    element: "select",
  },
  {
    label: "Employee",
    name: "employee",
    element: "select",
  },
  {
    label: "Shipper",
    name: "shipper",
    element: "select",
  },
];
</script>

<template>
  <div class="overflow-x-auto px-2 pb-2">
    <button class="btn mb-2" @click="isOpen = true">Add Order</button>
    <Modal
      :is-open="isOpen"
      @close="
        isOpen = false;
        selectedOrder &&= null;
      "
    >
      <div class="mb-2 text-center text-lg font-medium uppercase">
        {{ selectedOrder ? "Edit Order" : "Add Order" }}
      </div>
      <Form
        @submit="
          selectedOrder ? update(selectedOrder.id, $event) : add($event);
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
            :value="selectedOrder?.[field.name]"
          >
            <template v-if="field.name == 'customer'">
              <option value="" selected>Select a customer</option>
              <option
                v-for="(customer, i) in customers"
                :key="customer.id"
                :value="customer.id"
              >
                {{ customer.name }}
              </option>
            </template>
            <template v-else-if="field.name == 'product'">
              <option value="" selected>Select a product</option>
              <option
                v-for="product in products"
                :key="product.id"
                :value="product.id"
              >
                {{ product.name }}
              </option>
            </template>
            <template v-else-if="field.name == 'employee'">
              <option value="" selected>Select an employee</option>
              <option
                v-for="employee in employees"
                :key="employee.id"
                :value="employee.id"
              >
                {{ employee.name }}
              </option>
            </template>
            <template v-else-if="field.name == 'shipper'">
              <option value="" selected>Select a shipper</option>
              <option
                v-for="shipper in shippers"
                :key="shipper.id"
                :value="shipper.id"
              >
                {{ shipper.name }}
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
    <table class="table table-compact w-full">
      <thead>
        <tr>
          <th></th>
          <th v-for="field in fields" :key="field.name">{{ field.label }}</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, i) in (orders as Order[])" :key="order.id">
          <td>{{ i }}</td>
          <td v-for="field in fields" :key="field.name">
            <span v-if="field.name == 'customer'">
              {{
              ((customers.filter(
                (customer) => customer.id == order?.[field.name]
              )[0]) as Product).name
              }}
            </span>
            <span v-else-if="field.name == 'product'">
              {{
              ((products.filter(
                (product) => product.id == order?.[field.name]
              )[0]) as Product).name
              }}
            </span>
            <span v-else-if="field.name == 'employee'">
              {{
              ((employees.filter(
                (employee) => employee.id == order?.[field.name]
              )[0]) as Employee).name
              }}
            </span>
            <span v-else-if="field.name == 'shipper'">
              {{
              ((shippers.filter(
                (shipper) => shipper.id == order?.[field.name]
              )[0]) as Shipper).name
              }}
            </span>
          </td>
          <td class="flex gap-2">
            <button class="btn btn-sm" @click="del(order.id)">
              <Delete />
            </button>
            <button
              class="btn btn-sm"
              @click="
                isOpen = true;
                selectedOrder = order;
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
