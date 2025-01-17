<script>
    export default {
        name: "CheckboxAnswerComponent",
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

        computed: {
            selectedCheckboxes() {
                return this.question.options
                    .filter((checkbox) => checkbox.checked)
                    .map((checkbox) => checkbox.option_text);
            },
        },
        methods: {
            addCheckbox(text) {
                let options = [...this.question.options, { option_text: text ?? "", checked: false }];
                this.$emit("update-options", this.question, options);
            },
            removeCheckbox(index) {
                let options = this.question.options.filter((_, i) => i !== index);
                this.$emit("update-options", this.question, options);
                if (this.question.options.length === 0) {
                    this.addCheckbox();
                }
            },
            selectCheckbox(checkbox) {
                checkbox.checked = !checkbox.checked;
                let checkboxes = this.question.options.map((option) => {
                    if (option.option_text === checkbox.option_text) {
                        return checkbox;
                    }
                    return option;
                });
                checkboxes = checkboxes.filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.option_text);
                this.$emit("selected-checkbox", checkboxes, this.question);
            },
        },
        beforeMount() {
            if (this.question.options.length === 0) {
                this.addCheckbox();
            }
        },
    };
</script>

<template>
    <div>
        <div class="w-full mx-auto max-w-md space-y-4">
            <div
                v-for="(checkbox, index) in this.question.options"
                :key="index"
                class="flex items-center justify-between gap-4"
            >
                <input
                    type="checkbox"
                    v-model="checkbox.checked"
                    :disabled="!answerable"
                    @click="selectCheckbox(checkbox)"
                    class="size-4 border border-neutral-300 focus:ring-none focus:outline-offset-4 focus:outline-2 focus:outline-efrei-blue-700"
                />
                <input
                    type="text"
                    v-model="checkbox.option_text"
                    :placeholder="'Option ' + (index + 1)"
                    :disabled="!editable"
                    @input="$emit('update-options', question, question.options)"
                    class="block w-full text-sm rounded-md border border-neutral-300 px-4 py-1.5 placeholder-neutral-400 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700"
                    required
                />
                <button
                    v-if="editable"
                    type="button"
                    @click="removeCheckbox(index)"
                    class="block py-2.5 px-6 text-sm rounded-lg bg-red-50 text-red-500 cursor-pointer font-semibold text-center hover:bg-red-100 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-red-700"
                >
                    Remove
                </button>
            </div>

            <div v-if="editable">
                <button
                    type="button"
                    @click="addCheckbox()"
                    class="w-full rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm bg-efrei-blue-500 hover:bg-efrei-blue-950 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700"
                >
                    Add Checkbox
                </button>
            </div>
        </div>
    </div>
</template>

<style></style>
