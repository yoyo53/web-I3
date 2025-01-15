<script>
    export default {
        name: "RadioAnswerComponent",
        props: {
            question: {
                type: Object,
                required: true,
            },
            editable: {
                type: Boolean,
                default: false,
            },
            answerable: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                selectedRadio: null,
            };
        },

        methods: {
            addRadio(text) {
                let options = [...this.question.options, { option_text: text ?? "" }];
                this.$emit("update-options", this.question, options);
            },
            removeRadio(index) {
                let options = this.question.options.filter((_, i) => i !== index);
                this.$emit("update-options", this.question, options);
                if (this.selectedRadio === index) {
                    this.selectedRadio = null;
                } else {
                    if (this.selectedRadio > index) {
                        this.selectedRadio -= 1;
                    }
                    this.$emit("selected-radio", this.question.options[this.selectedRadio].option_text, this.question);
                }
                if (this.question.options.length === 0) {
                    this.addRadio();
                }
            },
        },
        beforeMount() {
            if (this.question.options.length === 0) {
                this.addRadio();
            }
        },
    };
</script>

<template>
    <div>
        <div class="w-full mx-auto max-w-md space-y-4">
            <div
                v-for="(radio, index) in this.question.options"
                :key="index"
                class="flex items-center justify-between gap-4"
            >
                <input
                    type="radio"
                    v-model="selectedRadio"
                    :value="index"
                    :disabled="!answerable"
                    @click="$emit('selected-radio', radio.option_text, question)"
                    class="size-4 border border-neutral-300 focus:ring-none focus:outline-offset-4 focus:outline-2 focus:outline-efrei-blue-700"
                />
                <input
                    type="text"
                    v-model="radio.option_text"
                    :placeholder="'Option ' + (index + 1)"
                    :disabled="!editable"
                    @input="$emit('update-options', question, question.options)"
                    class="block w-full text-sm rounded-md border border-neutral-300 px-4 py-1.5 placeholder-neutral-400 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700"
                    required
                />
                <button
                    v-if="editable"
                    type="button"
                    @click="removeRadio(index)"
                    class="block py-2.5 px-6 text-sm rounded-lg bg-red-50 text-red-500 cursor-pointer font-semibold text-center hover:bg-red-100 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-red-700"
                >
                    Remove
                </button>
            </div>

            <div v-if="editable">
                <button
                    type="button"
                    @click="addRadio()"
                    class="w-full rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm bg-efrei-blue-500 hover:bg-efrei-blue-950 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700"
                >
                    Add Radio Button
                </button>
            </div>
        </div>
    </div>
</template>

<style></style>
