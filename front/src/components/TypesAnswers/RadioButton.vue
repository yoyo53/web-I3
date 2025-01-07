<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8">

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div class="space-y-4">
                <div v-for="(radio, index) in localRadios" :key="index" class="flex items-center justify-between gap-4">
                    <!-- Radio button -->
                    <input type="radio" v-model="selectedRadio" :id="'radio-' + index" :value="index"
                        class="h-4 w-4 rounded-full border-gray-300 text-primary focus:ring-primary" />
                        <div v-if="!isEditable">{{ checkbox.option_text }}</div>
                    <input v-else type="text" v-model="radio.option_text" :placeholder="'Enter name for radio button ' + (index + 1)"
                        class="block w-full rounded-md border-0 py-1.5 pl-2 text-primary-blue-color shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-primary sm:text-sm/6" 
                        required
                        />
                    <button v-if="isEditable" @click="removeRadio(index)" type="button"
                        class="py-2.5 px-6 text-sm rounded-lg bg-red-50 text-red-500 cursor-pointer font-semibold text-center shadow-xs transition-all duration-300 hover:bg-red-100 hover:text-red-700">
                        Remove
                    </button>
                </div>
            </div>

            <div v-if="isEditable" class="mt-6">
                <button @click="addRadio"
                    class="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-[white] shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors duration-150">
                    Add Radio Button
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    question: {
      type: Object,
      required: true,
    },
    isEditable: {
      type: Boolean,
      default: true,
    },  
    // radios: {
    //   type: Array,
    //   default: () => [{ option_text: "Default Option" }], // Option par défaut
    // },
  },
  data() {
    return {
      localRadios: this.question.options.length
        ? [...this.question.options]
        : [{ option_text: "Default Answer" }],// [...this.question.radios],
      selectedRadio: null, // Garde l'index de l'option sélectionnée
    };
  },
  watch: {
    localRadios: {
      deep: true,
      handler() {
        this.$emit("update-options", this.question, this.localRadios);
      },
    },
  },
  methods: {
    addRadio() {
      this.localRadios.push({ option_text: "" });
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
