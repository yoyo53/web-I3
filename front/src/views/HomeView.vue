<script setup>
    import HeaderComponent from "@/components/HeaderComponent.vue";
    import FooterComponent from "@/components/FooterComponent.vue";
</script>

<template>
    <HeaderComponent />
    <section class="bg-white">
        <div class="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-12">
            <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                TeachPoint. Teacher grading made easy
            </h1>
            <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48">
                TeachPoint is a platform that helps students grade their teachers easily and efficiently. With
                TeachPoint, students can grade their teachers in a few clicks.
            </p>
            <div class="flex flex-col mb-8 space-y-4 lg:mb-16 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                <RouterLink
                    :to="{ name: 'about' }"
                    class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-primary-hover rounded-lg hover:bg-primary-hover focus:ring-4 focus:ring-primary-hover :ring-primary-hover"
                >
                    Learn more
                    <svg
                        class="w-5 h-5 ml-2 -mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                </RouterLink>
                <a
                    href="https://youtube.com"
                    class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 :bg-gray-700 :ring-gray-800"
                >
                    <svg
                        class="w-5 h-5 mr-2 -ml-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"
                        ></path>
                    </svg>
                    Watch video
                </a>
            </div>
            <div class="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
                <span class="font-semibold text-gray-400 uppercase">They trust us</span>
                <div class="flex flex-wrap items-center justify-center mt-8 text-gray-500 sm:justify-between">
                    <a href="https://www.hec.edu/" class="mb-5 mr-5 lg:mb-0 hover:text-gray-800 :text-gray-400">
                        <img class="h-20" src="@/assets/logo-hec.svg" alt="HEC Logo" />
                    </a>
                    <a
                        href="https://www.polytechnique.edu/"
                        class="mb-5 mr-5 lg:mb-0 hover:text-gray-800 :text-gray-400"
                    >
                        <img class="h-20" src="@/assets/logo-polytech.svg" alt="HEC Logo" />
                    </a>
                    <a href="https://ecoledesponts.fr/" class="mb-5 mr-5 lg:mb-0 hover:text-gray-800 :text-gray-400">
                        <img class="h-20" src="@/assets/logo-ponts.svg" alt="HEC Logo" />
                    </a>
                </div>
            </div>
        </div>
    </section>
    <section class="bg-white">
        <div class="items-center max-w-screen-xl gap-16 px-4 py-8 mx-auto lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
            <div class="text-gray-500 sm:text-lg">
                <h2 class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900">We didn't reinvent the wheel</h2>
                <p class="mb-4">
                    We are strategists, designers and developers. Innovators and problem solvers. Small enough to be
                    simple and quick, but big enough to deliver the scope you want at the pace you need. Small enough to
                    be simple and quick, but big enough to deliver the scope you want at the pace you need.
                </p>
                <p>
                    We are strategists, designers and developers. Innovators and problem solvers. Small enough to be
                    simple and quick.
                </p>
            </div>
            <div class="grid grid-cols-2 gap-4 mt-8">
                <img
                    class="w-full rounded-lg"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
                    alt="office content 1"
                />
                <img
                    class="w-full mt-4 rounded-lg lg:mt-10"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
                    alt="office content 2"
                />
            </div>
        </div>
    </section>

    <section class="bg-white">
        <div
            class="items-center max-w-screen-xl gap-8 px-4 py-8 mx-auto xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6"
        >
            <img
                class="w-full"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg"
                alt="dashboard image"
            />
            <img
                class="hidden w-full"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg"
                alt="dashboard image"
            />
            <div class="mt-4 md:mt-0">
                <h2 class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900">Let's get started</h2>
                <p class="mb-6 text-gray-500 md:text-lg">
                    TeachPoint helps you to make your teacher grading process easier and more efficient. With
                    TeachPoint, your students can grade their teachers in a few clicks.
                </p>
                <RouterLink
                    :to="{ name: 'login' }"
                    class="inline-flex items-center text-white bg-primary-hover hover:bg-primary-hover focus:ring-4 focus:ring-primary-hover font-medium rounded-lg text-sm px-5 py-2.5 text-center :ring-primary-hover"
                >
                    Get started
                    <svg
                        class="w-5 h-5 ml-2 -mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                </RouterLink>
            </div>
        </div>
    </section>
    <FooterComponent />
</template>
