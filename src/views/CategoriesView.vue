<script setup lang="ts">
import useSupabase from "@/composables/useSupabase";
import type Category from "@/interfaces/Category";
import Delete from "@/components/icons/Delete.vue";
import Edit from "@/components/icons/Edit.vue";
import Modal from "@/components/Modal.vue";
import Form from "@/components/Form.vue";
import Field from "@/components/Field.vue";
import { ref } from "vue";

const { fields: categories, add, del, update } = useSupabase("categories");
const isOpen = ref(false);
const selectedCategory = ref<Category | null>(null);

const fields = [
  {
    label: "Name",
    name: "name",
    element: "input",
    type: "text",
  },
  {
    label: "Description",
    name: "description",
    element: "textarea",
  },
];
</script>

<template>
  <div class="overflow-x-auto px-2 pb-2">
    <button class="btn mb-2" @click="isOpen = true">Add Category</button>
    <Modal
      :is-open="isOpen"
      @close="
        isOpen = false;
        selectedCategory &&= null;
      "
    >
      <div class="mb-2 text-center text-lg font-medium uppercase">
        {{ selectedCategory ? "Edit Category" : "Add Category" }}
      </div>
      <Form
        @submit="
          selectedCategory ? update(selectedCategory.id, $event) : add($event);
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
            :value="selectedCategory?.[field.name]"
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
          v-for="(employee, i) in (categories as Category[])"
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
                selectedCategory = employee;
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
