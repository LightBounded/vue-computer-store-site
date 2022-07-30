<script setup lang="ts">
import useSupabase from "@/composables/useSupabase";
import type Employee from "@/interfaces/Employee";
import Delete from "@/components/icons/Delete.vue";
import Edit from "@/components/icons/Edit.vue";
import Modal from "@/components/Modal.vue";
import Form from "@/components/Form.vue";
import Field from "@/components/Field.vue";
import { ref } from "vue";

const { fields: employees, add, del, update } = useSupabase("employees");
const isOpen = ref(false);
const selectedEmployee = ref<Employee | null>(null);

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
    label: "Birthdate",
    name: "birthdate",
    element: "input",
    type: "date",
  },
];
</script>

<template>
  <div class="overflow-x-auto px-2 pb-2">
    <button class="btn mb-2" @click="isOpen = true">Add Employee</button>
    <Modal
      :is-open="isOpen"
      @close="
        isOpen = false;
        selectedEmployee &&= null;
      "
    >
      <div class="mb-2 text-center text-lg font-medium uppercase">
        {{ selectedEmployee ? "Edit Employee" : "Add Employee" }}
      </div>
      <Form
        @submit="
          selectedEmployee ? update(selectedEmployee.id, $event) : add($event);
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
            :value="selectedEmployee?.[field.name]"
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
          v-for="(employee, i) in (employees as Employee[])"
          :key="employee.id"
        >
          <td>{{ i }}</td>
          <td v-for="field in fields" :key="field.name">
            {{ employee[field.name] }}
          </td>
          <td class="flex gap-2">
            <button class="btn btn-sm" @click="del(employee.id)">
              <Delete />
            </button>
            <button
              class="btn btn-sm"
              @click="
                isOpen = true;
                selectedEmployee = employee;
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
