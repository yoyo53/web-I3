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
            component: () => import("../views/HomeView.vue"),
        },
        {
            path: "/login",
            name: "login",
            component: () => import("../views/LoginView.vue"),
        },
        {
            path: "/admin/register",
            name: "register",
            component: () => import("../views/RegisterView.vue"),
        },
        {
            path: "/teacher",
            name: "teacher",
            component: () => import("../views/SurveysListView.vue"),
        },
        {
            path: "/admin",
            name: "admin",
            component: () => import("../views/SurveysListView.vue"),
        },
        {
            path: "/admin/templates",
            name: "templates",
            component: () => import("../views/TemplateView.vue"),
        },
        {
            path: '/admin/template/:id',
            name: 'templateDetail',
            component: () => import('../views/TemplateDetailView.vue'),
            props: true,
        },
        {
            path: "/admin/templates/create",
            name: "createTemplate",
            component: () => import("../views/CreateTemplateView.vue"),
        },
        {
            path: "/admin/surveys/create",
            name: "createSurvey",
            component: () => import("../views/CreateSurveyView.vue"),
        },
        {
            props: true,
            path: "/profile",
            name: "profile",
            component: () => import("../views/ProfileView.vue"),
        },
        {
            path: "/about",
            name: "about",
            component: () => import("../views/AboutView.vue"),
        },
        {
            path: "/admin/survey/:id",
            name: "adminSurveys",
            component: () => import("../views/DetailedSurveyView.vue"),
            props: true,
        },
        {
            path: "/teacher/survey/:id",
            name: "teacherSurveys",
            component: () => import("../views/DetailedSurveyView.vue"),
            props: true,
        },
        {
            path: "/student/survey/:id",
            name: "studentSurveys",
            component: () => import("../views/DetailedSurveyView.vue"),
            props: true,
        },
        {
          path: "/student",
          name: "student",
          component: () => import("../views/SurveysListView.vue"),
        }, 
        {
          path: "/student/survey/:id",
          name: "student-survey",
          component: () => import("../views/DetailedSurveyView.vue"),
          props: true,
        }, 
        {
            path: "/:pathMatch(.*)*",
            name: "404",
            component: () => import("../views/404View.vue"),
        },
    ],
});


router.beforeEach(async (to, from, next) => {
    document.activeElement.blur();
    const userState = inject("userState");
    const publicPages = ["/", "/about", "/404"];
    const token = localStorage.getItem("token");
    userState.userType = null;
    userState.userId = null;
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
            userState.userId = data.user_id;
        } catch (error) {
            console.error(error);
            window.localStorage.removeItem("token");
        }
    }
    if (to.matched.some((route) => route.name === "404")) {
        next();
    } else if (publicPages.includes(to.path)) {
        next();
    } else if (userState.userType === "Admin") {
        if (to.path.startsWith("/admin") || to.path === "/profile") {
            next();
        } else {
            toaster.error("You are not authorized to access this page.");
            next("/admin");
        }
    } else if (userState.userType === "Teacher") {
        if (to.path.startsWith("/teacher") || to.path === "/profile") {
            next();
        } else {
            toaster.error("You are not authorized to access this page.");
            next("/teacher");
        }
    } else if (userState.userType === "Student") {
        if (to.path.startsWith("/student") || to.path === "/profile") {
            next();
        } else {
            toaster.error("You are not authorized to access this page.");
            next("/student");
        }
    } else if (to.path === "/login") {
        next();
    } else {
        toaster.error("You are not authorized to access this page.");
        next("/login");
    }
});

export default router;
