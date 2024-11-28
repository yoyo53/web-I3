<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div class="space-y-4">
                <div v-for="(checkbox, index) in checkboxes" :key="index"
                    class="flex items-center justify-between gap-4">
                    <input type="checkbox" v-model="checkbox.checked" :id="'checkbox-' + index"
                        class="h-4 w-4 rounded border-gray-300 text-secondary-blue-color focus:ring-secondary-blue-color" />
                    <input type="text" v-model="checkbox.label" :placeholder="'Enter name for checkbox ' + (index + 1)"
                        class="block w-full rounded-md border-0 py-1.5 pl-2 text-primary-blue-color shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-secondary-blue-color sm:text-sm/6" />
                    <button @click="removeCheckbox(index)"
                        class="rounded-md bg-red-color px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-orange-color focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-color">
                        Remove
                    </button>
                </div>
            </div>

            <div class="mt-6">
                <button @click="addCheckbox"
                    class="flex w-full justify-center rounded-md bg-secondary-blue-color px-3 py-1.5 text-sm/6 font-semibold text-[black] shadow-sm hover:bg-tertiary-blue-color focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-blue-color transition-colors duration-150">
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