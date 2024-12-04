<template>
    <li>
        <router-link @click.prevent="handleClick" :to="to" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <img :src="img" class="w-7 h-7 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true"/>
            <span :class="['ms-3', 'text-lg', textStyle]">{{ text }}</span>
        </router-link>
    </li>
</template>

<script>
export default {
    name: 'TabComponent',
    props: {
        img: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        click: {
            type: Function,
            default: () => {}
        },
        textStyle: {
            type: String,
            default: 'text-white'
        },
        to: {
            type: Object,
            required: true
        }
    },
    methods: {
        handleClick() {
            this.click();
        }
    }
}
</script>
