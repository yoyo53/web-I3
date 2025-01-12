<template>
    <div className="bg-white py-12 flex flex-col gap-y-10">
        <div className="mx-auto flex flex-col max-w-7xl gap-x-8 gap-y-6 px-6 lg:px-8">
            <h2 className="text-center max-w-2xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mx-auto">
                The story behind TeachPoint
            </h2>
            <p className="text-lg leading-8 text-gray-600 text-justify max-w-3xl mx-auto">
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
        </div>
        <div className="mx-auto flex flex-col max-w-7xl gap-x-8 gap-y-6 px-6 lg:px-8 mt-5">
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mx-auto">
                Meet our team
            </h2>
            <ul role="list" className="flex flex-wrap gap-x-6 gap-y-12 justify-center items-center">
                <li v-for="member in team" :key="member.name">
                    <div className="flex justify-center items-center gap-x-6">
                        <img className="h-32 w-32 rounded-full" :src="member.avatar" alt="" />
                        <div>
                            <h3 className="text-2xl font-semibold leading-7 tracking-tight text-gray-900">
                                {{ member.name }}
                            </h3>
                            <p className="text-lg font-semibold leading-6 text-indigo-600">{{ member.role }}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import avatarHugo from "@/assets/avatar-hugo.jpg";
    import avatarYohan from "@/assets/avatar-yohan.jpg";
    import avatarLucas from "@/assets/avatar-lucas.jpg";
    import avatarArnaud from "@/assets/avatar-arnaud.jpg";
    import avatarLudovic from "@/assets/avatar-ludovic.jpg";

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
