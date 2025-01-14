<script></script>

<template>
    <div class="flex flex-col items-center justify-center">
        <section>
            <div class="py-8 px-4 mx-auto text-center">
                <h1 class="mb-4 text-8xl tracking-tight font-extrabold md:text-9xl text-efrei-blue-500">404</h1>
                <p class="mb-4 text-3xl tracking-tight font-bold md:text-4xl text-efrei-blue-500">
                    Something's missing.
                </p>
                <p class="mb-4 text-lg text-neutral-500">
                    Sorry, we can't find that page. You'll find lots to explore on the home page.
                </p>
                <RouterLink
                    :to="{ name: 'home' }"
                    class="inline-flex my-4 px-5 py-2.5 text-sm font-medium text-center rounded-lg text-white bg-efrei-blue-500 hover:bg-efrei-blue-950 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700"
                >
                    Back to Homepage
                </RouterLink>
            </div>
        </section>
    </div>
</template>

<style></style>
