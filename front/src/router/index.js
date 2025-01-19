import { createRouter, createWebHashHistory } from "vue-router";
import { inject } from "vue";
import { useToast } from "vue-toastification";
const toaster = useToast();

const router = createRouter({
    history: createWebHashHistory(import.meta.env.VITE_BASE_PATH),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("@/views/HomeView.vue"),
            alias: ["/home"],
        },
        {
            path: "/about",
            name: "about",
            component: () => import("@/views/AboutView.vue"),
        },
        {
            path: "/login",
            name: "login",
            component: () => import("@/views/LoginView.vue"),
        },
        {
            path: "/profile",
            name: "profile",
            component: () => import("@/views/ProfileView.vue"),
        },
        {
            path: "/admin",
            name: "admin",
            component: () => import("@/views/surveys/SurveysListView.vue"),
            alias: ["/admin/surveys"],
        },
        {
            path: "/admin/users/create",
            name: "adminUserCreate",
            component: () => import("@/views/admin/UserCreateView.vue"),
        },
        {
            path: "/admin/surveys/create",
            name: "adminSurveyCreate",
            component: () => import("@/views/surveys/SurveyCreateView.vue"),
        },
        {
            path: "/admin/surveys/:id",
            name: "adminSurveyView",
            component: () => import("@/views/surveys//SurveyView.vue"),
            props: true,
        },
        {
            path: "/admin/templates",
            name: "adminTemplatesList",
            component: () => import("@/views/templates/TemplatesListView.vue"),
        },
        {
            path: "/admin/templates/create",
            name: "adminTemplateCreate",
            component: () => import("@/views/templates/TemplateCreateView.vue"),
        },
        {
            path: "/admin/templates/:id",
            name: "adminTemplateView",
            component: () => import("@/views/templates/TemplateView.vue"),
            props: true,
        },
        {
            path: "/teacher",
            name: "teacher",
            component: () => import("@/views/surveys/SurveysListView.vue"),
            alias: ["/teacher/surveys"],
        },
        {
            path: "/teacher/surveys/:id",
            name: "teacherSurveyView",
            component: () => import("@/views/surveys/SurveyView.vue"),
            props: true,
        },
        {
            path: "/student",
            name: "student",
            component: () => import("@/views/surveys/SurveysListView.vue"),
            alias: ["/student/surveys"],
        },
        {
            path: "/student/survey/:id",
            name: "studentSurveyView",
            component: () => import("@/views/surveys/SurveyView.vue"),
            props: true,
        },
        {
            path: "/:pathMatch(.*)*",
            name: "404",
            component: () => import("@/views/404View.vue"),
        },
    ],
});

router.beforeEach(async (to, from, next) => {
    document.activeElement.blur();
    const userState = inject("userState");
    const publicPages = ["home", "about", "login"];
    const token = localStorage.getItem("token");
    userState.userType = null;
    if (token) {
        try {
            const response = await fetch(import.meta.env.VITE_API_URL + "auth/verifyToken", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            });
            if (!response.ok) {
                toaster.error("Session expired, please login again.");
                throw new Error(response.statusText);
            }
            const data = await response.json();
            userState.userType = data.user_type;
        } catch (error) {
            console.error(error);
            window.localStorage.removeItem("token");
        }
    }
    if (to.matched.some((route) => route.name === "404")) {
        next();
    } else if (publicPages.includes(to.name)) {
        next();
    } else if (userState.userType === "Admin") {
        if (to.path.startsWith("/admin") || to.name === "profile") {
            next();
        } else {
            toaster.error("You are not authorized to access this page.");
            next({ name: "admin" });
        }
    } else if (userState.userType === "Teacher") {
        if (to.path.startsWith("/teacher") || to.name === "profile") {
            next();
        } else {
            toaster.error("You are not authorized to access this page.");
            next({ name: "teacher" });
        }
    } else if (userState.userType === "Student") {
        if (to.path.startsWith("/student") || to.name === "profile") {
            next();
        } else {
            toaster.error("You are not authorized to access this page.");
            next({ name: "student" });
        }
    } else if (to.name === "login") {
        next();
    } else {
        toaster.error("You are not authorized to access this page.");
        next({ name: "home" });
    }
});

export default router;
