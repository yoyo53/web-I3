<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8">

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div class="space-y-4">
                <div v-for="(radio, index) in localRadios" :key="index" class="flex items-center justify-between gap-4">
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
                    class="flex w-full justify-center rounded-md bg-secondary-blue-color px-3 py-1.5 text-sm/6 font-semibold text-[black] shadow-sm hover:bg-primary-blue-color focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-blue-color transition-colors duration-150">
                    Add Radio Button
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    questionId: {
      type: [String, Number],
      required: true,
    },
    radios: {
      type: Array,
      default: () => [{ label: "Default Option" }], // Option par défaut
    },
  },
  data() {
    return {
      localRadios: [...this.radios],
      selectedRadio: null, // Garde l'index de l'option sélectionnée
    };
  },
  watch: {
    localRadios: {
      deep: true,
      handler() {
        this.$emit("update-options", this.questionId, this.localRadios);
      },
    },
  },
  methods: {
    addRadio() {
      this.localRadios.push({ label: "" });
    },
    removeRadio(index) {
      if (this.selectedRadio === index) {
        this.selectedRadio = null; 
      }
      this.localRadios.splice(index, 1);
    },
  },
};
</script>
