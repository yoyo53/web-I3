import { test } from "vitest";
import { render } from "@testing-library/vue";
import HomeView from "@/views/HomeView.vue";

test("Page", () => {
    const page = render(HomeView, {
        props: {},
    });
    page.getAllByText("TeachPoint. Teacher grading made easy");
});
