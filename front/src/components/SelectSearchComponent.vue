<script>
    export default {
        name: "SelectSearchComponent",
        props: {
            options: {
                type: Array,
                required: true,
            },
            placeholder: {
                type: String,
                default: "Sélectionner une option",
            },
            emptyMessage: {
                type: String,
                default: "Aucun résultat trouvé",
            },
        },
        data() {
            return {
                isOpen: false,
                search: "",
                selected: null,
                highlightedIndex: -1,
            };
        },
        computed: {
            filteredOptions() {
                return this.options.filter((option) => option.name.toLowerCase().includes(this.search.toLowerCase()));
            },
        },
        methods: {
            openDropdown() {
                this.isOpen = true;
            },
            closeDropdown() {
                setTimeout(() => {
                    this.isOpen = false;
                }, 200);
            },
            navigate(direction) {
                if (!this.isOpen) {
                    this.openDropdown();
                    return;
                }
                const lastIndex = this.filteredOptions.length - 1;
                if (direction === 1) {
                    this.highlightedIndex = this.highlightedIndex < lastIndex ? this.highlightedIndex + 1 : 0;
                } else if (direction === -1) {
                    this.highlightedIndex = this.highlightedIndex > 0 ? this.highlightedIndex - 1 : lastIndex;
                }
            },
            selectOption(index) {
                if (!this.isOpen || index < 0 || index >= this.options.length) {
                    return;
                }
                this.selected = this.options[index];
                this.search = this.options[index].name;
                this.isOpen = false;
                this.$emit("option-selected", this.options[index]);
            },
        },
    };
</script>

<template>
    <div class="relative">
        <input
            type="text"
            v-model="search"
            @focus="openDropdown"
            @focusout="closeDropdown"
            @keydown.down.prevent="navigate(1)"
            @keydown.up.prevent="navigate(-1)"
            @keydown.enter.prevent="selectOption(highlightedIndex)"
            @keydown.esc="closeDropdown"
            :placeholder="placeholder"
            class="w-full px-4 py-2 rounded-md border border-neutral-300 shadow focus:outline-none focus:ring-offset-4 focus:ring-2 focus:ring-efrei-blue-700"
        />

        <div
            v-if="isOpen"
            class="absolute z-10 w-full mt-1 px-2 py-2 rounded-md bg-white border border-neutral-300 shadow-sm placeholder-neutral-500"
        >
            <ul class="max-h-48 px-1 overflow-y-auto">
                <li
                    v-for="(option, index) in filteredOptions"
                    :key="index"
                    @mouseenter="highlightedIndex = index"
                    @mouseleave="highlightedIndex = -1"
                    @click="selectOption(index)"
                    :class="{ 'bg-efrei-blue-50': highlightedIndex === index }"
                    class="px-4 py-2 cursor-pointer rounded-lg break-all"
                >
                    {{ option.name }}
                </li>
                <li v-if="filteredOptions.length === 0" class="px-4 py-2 text-neutral-500">{{ emptyMessage }}</li>
            </ul>
        </div>
    </div>
</template>
