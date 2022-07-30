<script setup lang="ts">
import useSupabase from "@/composables/useSupabase";
import type Shipper from "@/interfaces/Shipper";
import Delete from "@/components/icons/Delete.vue";
import Edit from "@/components/icons/Edit.vue";
import Modal from "@/components/Modal.vue";
import Form from "@/components/Form.vue";
import Field from "@/components/Field.vue";
import { ref } from "vue";

const { fields: shippers, add, del, update } = useSupabase("shippers");

const isOpen = ref(false);
const selectedShipper = ref<Shipper | null>(null);

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
    type: "text",
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
    <button class="btn mb-2" @click="isOpen = true">Add Shipper</button>
    <Modal
      :is-open="isOpen"
      @close="
        isOpen = false;
        selectedShipper &&= null;
      "
    >
      <div class="mb-2 text-center text-lg font-medium uppercase">
        {{ selectedShipper ? "Edit Shipper" : "Add Shipper" }}
      </div>
      <Form
        @submit="
          selectedShipper ? update(selectedShipper.id, $event) : add($event);
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
            :value="selectedShipper?.[field.name]"
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
        <tr v-for="(shipper, i) in (shippers as Shipper[])" :key="shipper.id">
          <td>{{ i }}</td>
          <td v-for="field in fields" :key="field.name">
            {{ shipper[field.name] }}
          </td>
          <td class="flex gap-2">
            <button class="btn btn-sm" @click="del(shipper.id)">
              <Delete />
            </button>
            <button
              class="btn btn-sm"
              @click="
                isOpen = true;
                selectedShipper = shipper;
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
