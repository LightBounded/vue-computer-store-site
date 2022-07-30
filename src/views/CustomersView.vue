<script setup lang="ts">
import useSupabase from "@/composables/useSupabase";
import type Customer from "@/interfaces/Customer";
import Delete from "@/components/icons/Delete.vue";
import Edit from "@/components/icons/Edit.vue";
import Modal from "@/components/Modal.vue";
import Form from "@/components/Form.vue";
import Field from "../components/Field.vue";
import { ref } from "vue";

const { fields: customers, add, del, update } = useSupabase("customers");
const isOpen = ref(false);
const selectedCustomer = ref<Customer | null>(null);

const fields = [
  {
    label: "Name",
    name: "name",
    element: "input",
    type: "text",
  },
  {
    label: "Phone Number",
    name: "phone_number",
    element: "input",
    type: "tel",
  },
  {
    label: "Email",
    name: "email",
    element: "input",
    type: "email",
  },
  {
    label: "Address",
    name: "address",
    element: "input",
    type: "text",
  },
];
</script>

<template>
  <div class="overflow-x-auto px-2 pb-2">
    <button class="btn mb-2" @click="isOpen = true">Add Customers</button>
    <Modal
      :is-open="isOpen"
      @close="
        isOpen = false;
        selectedCustomer &&= null;
      "
    >
      <div class="mb-2 text-center text-lg font-medium uppercase">
        {{ selectedCustomer ? "Edit Customer" : "Add Customer" }}
      </div>
      <Form
        @submit="
          selectedCustomer ? update(selectedCustomer.id, $event) : add($event);
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
            :placeholder="field.label"
            :value="selectedCustomer?.[field.name]"
          />
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
        <tr
          v-for="(customer, i) in (customers as Customer[])"
          :key="customer.id"
        >
          <td>{{ i }}</td>
          <td v-for="field in fields" :key="field.name">
            {{ customer[field.name] }}
          </td>
          <td class="flex gap-2">
            <button class="btn btn-sm" @click="del(customer.id)">
              <Delete />
            </button>
            <button
              class="btn btn-sm"
              @click="
                isOpen = true;
                selectedCustomer = customer;
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
