<script>
    export default {
        name: "PopupComponent",
        props: {
            isOpen: {
                type: Boolean,
                required: true,
            },
            popUpText: {
                type: String,
                required: true,
            },
        },
        methods: {
            closeModal() {
                this.$emit("close-modal");
            },
            confirmAction() {
                this.$emit("confirm-action");
                this.closeModal();
            },
        },
    };
</script>

<template>
    <div
        v-if="isOpen"
        tabindex="-1"
        class="absolute top-0 left-0 z-50 flex justify-center items-center w-full h-full bg-neutral-900 bg-opacity-50"
    >
        <div class="max-w-md relative bg-white rounded-lg">
            <button
                @click="closeModal"
                type="button"
                class="absolute top-4 end-4 size-8 p-2 hover:bg-neutral-200 rounded-lg"
            >
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
            <div class="p-5 text-center">
                <svg
                    class="mx-auto mb-4 text-red-500 size-12"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                </svg>
                <h3 class="mb-5 text-lg font-normal">
                    {{ popUpText }}
                </h3>
                <button
                    @click="confirmAction"
                    type="button"
                    class="py-2.5 px-5 text-sm rounded-lg bg-red-500 text-white cursor-pointer font-semibold text-center hover:bg-red-700 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-red-700"
                >
                    Yes, I'm sure
                </button>
                <button
                    @click="closeModal"
                    type="button"
                    class="py-2.5 px-5 ms-3 text-sm font-medium text-center rounded-lg border border-neutral-300 hover:bg-efrei-blue-50 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700"
                >
                    No, cancel
                </button>
            </div>
        </div>
    </div>
</template>

<style></style>