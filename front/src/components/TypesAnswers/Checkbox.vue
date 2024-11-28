<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Manage Checkboxes
        </h2>
      </div>
  
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div class="space-y-4">
          <div 
            v-for="(checkbox, index) in checkboxes" 
            :key="index" 
            class="flex items-center justify-between gap-4"
          >
            <input
              type="checkbox"
              v-model="checkbox.checked"
              :id="'checkbox-' + index"
              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <input
              type="text"
              v-model="checkbox.label"
              :placeholder="'Enter name for checkbox ' + (index + 1)"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
            />
            <button
              @click="removeCheckbox(index)"
              class="rounded-md bg-red-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Remove
            </button>
          </div>
        </div>
  
        <div class="mt-6">
          <button
            @click="addCheckbox"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Checkbox
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        checkboxes: [
          { label: "Default Checkbox", checked: false },
        ],
      };
    },
    methods: {
      addCheckbox() {
        this.checkboxes.push({ label: "", checked: false });
      },
      removeCheckbox(index) {
        this.checkboxes.splice(index, 1);
      },
    },
  };
  </script>
  
  <style>
  /* Additional styles can go here if needed */
  </style>
  