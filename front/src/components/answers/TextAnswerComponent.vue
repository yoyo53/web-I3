<script>
    export default {
        name: "TextAnswerComponent",
        props: {
            question: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                text: "",
            };
        },
        methods: {
            selectText() {
                this.$emit("selectedText", [this.text], this.question);
            },
        },
        beforeMount() {
            this.selectText();
        },
    };
</script>

<template>
    <div>
        <textarea
            v-model="text"
            @input="selectText"
            class="block w-full px-4 py-2 border border-neutral-300 rounded-md mb-2 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700"
            rows="4"
        ></textarea>
    </div>
</template>

<style></style>
