<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-primary-blue-color">
                Manage Radio Buttons
            </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div class="space-y-4">
                <div v-for="(radio, index) in radios" :key="index" class="flex items-center justify-between gap-4">
                    <!-- Radio button -->
                    <input 
                        type="radio" 
                        v-model="selectedRadio" 
                        :id="'radio-' + index"
                        :value="index" 
                        class="h-4 w-4 rounded-full border-gray-300 text-secondary-blue-color focus:ring-secondary-blue-color" 
                    />
                    <input 
                        type="text" 
                        v-model="radio.label" 
                        :placeholder="'Enter name for radio button ' + (index + 1)"
                        class="block w-full rounded-md border-0 py-1.5 pl-2 text-primary-blue-color shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-secondary-blue-color sm:text-sm/6" 
                    />
                    <button 
                        @click="removeRadio(index)"
                        class="rounded-md bg-red-color px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-orange-color focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-color">
                        Remove
                    </button>
                </div>
            </div>

            <div class="mt-6">
                <button @click="addRadio"
                    class="flex w-full justify-center rounded-md bg-secondary-blue-color px-3 py-1.5 text-sm/6 font-semibold text-[black] shadow-sm hover:bg-tertiary-blue-color focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-blue-color transition-colors duration-150">
                    Add Radio Button
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            radios: [
                { label: "Default Radio Button" },
            ],
            selectedRadio: null,  // To hold the selected radio button's index
        };
    },
    methods: {
        addRadio() {
            this.radios.push({ label: "" });
        },
        removeRadio(index) {
            // Remove the selected radio if it's the one being deleted
            if (this.selectedRadio === index) {
                this.selectedRadio = null;
            }
            this.radios.splice(index, 1);
        },
    },
};
</script>
