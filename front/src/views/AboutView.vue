<script>
    import avatarHugo from "@/assets/images/avatar-hugo.jpg";
    import avatarYohan from "@/assets/images/avatar-yohan.jpg";
    import avatarLucas from "@/assets/images/avatar-lucas.jpg";
    import avatarArnaud from "@/assets/images/avatar-arnaud.jpg";
    import avatarLudovic from "@/assets/images/avatar-ludovic.jpg";

    export default {
        name: "AboutView",
        data() {
            return {
                team: [
                    {
                        name: "Hugo Parmentier",
                        role: "Co-Founder",
                        avatar: avatarHugo,
                    },
                    {
                        name: "Yohan Villiers",
                        role: "Co-Founder",
                        avatar: avatarYohan,
                    },
                    {
                        name: "Lucas Brancolini",
                        role: "Co-Founder",
                        avatar: avatarLucas,
                    },
                    {
                        name: "Arnaud Kohler",
                        role: "Co-Founder",
                        avatar: avatarArnaud,
                    },
                    {
                        name: "Ludovic Liu Chi Pioa",
                        role: "Co-Founder",
                        avatar: avatarLudovic,
                    },
                ],
            };
        },
    };
</script>

<template>
    <div>
        <section class="my-6">
            <h2 class="mx-auto mb-8 text-center max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
                The story behind TeachPoint
            </h2>
            <p class="mx-auto text-lg leading-8 text-neutral-500 text-justify max-w-3xl">
                Welcome to TeachPoint, the only place where the red pen is firmly in the hands of the students! Forget
                apples and polite head nods—this is your chance to give your teachers the real feedback they didn’t ask
                for.<br /><br />

                Whether your math teacher’s jokes are more outdated than their chalkboard or your history teacher thinks
                “fun” is just a chapter on the syllabus, TeachPoint lets you share your experiences and rate the
                educators who shaped (or scrambled) your brain.<br /><br />

                From rating how well they explained quadratic equations to how often they confused you with your twin,
                this is your platform to say what you’ve always wanted—anonymously, of course!<br /><br />

                So grab your metaphorical red marker, channel your inner critic, and let the grading begin. Teachers,
                consider this your syllabus for self-improvement… or just a reality check.
            </p>
        </section>
        <section class="my-6">
            <h2 class="mx-auto mb-8 text-center max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
                Meet our team
            </h2>
            <ul role="list" class="flex justify-center items-center flex-wrap mx-auto max-w-7xl gap-x-6 gap-y-12">
                <li v-for="member in team" :key="member.name">
                    <div class="flex justify-center items-center gap-x-6">
                        <img class="h-32 w-32 rounded-full" :src="member.avatar" alt="" />
                        <div>
                            <h3 class="text-2xl font-semibold leading-7 tracking-tight">
                                {{ member.name }}
                            </h3>
                            <p class="text-lg font-semibold leading-6 text-efrei-blue-500">{{ member.role }}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </section>
    </div>
</template>

<style></style>
