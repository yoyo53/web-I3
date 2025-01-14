<template>
    <div>
        <textarea 
            v-model="text" 
            @input="returnText"
            class="block w-full px-4 py-2 border rounded-md shadow-sm text-gray-700 mb-2"
            rows="4"
        ></textarea>
    </div>
</template>

<script>

export default {
    name: 'TextAnswer',
    props: {
        question: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            text: null,
        };
    },
    methods: {
        returnText() {
            this.$emit('selectedText', [this.text], this.question);
        },
    },
};
</script>