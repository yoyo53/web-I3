import { describe, test } from "vitest";
import { render } from "@testing-library/vue";
import HomeView from "@/views/HomeView.vue";

describe("HomeView.vue", () => {
    test("renders the main heading", () => {
        const { getAllByText } = render(HomeView);
        getAllByText("TeachPoint. Teacher grading made easy");
    });

    test("renders the description paragraph", () => {
        const { getAllByText } = render(HomeView);
        getAllByText(
            "TeachPoint is a platform that helps students grade their teachers easily and efficiently. With TeachPoint, students can grade their teachers in a few clicks.",
        );
    });

    test('renders the "Learn more" button', () => {
        const { getAllByText } = render(HomeView);
        getAllByText("Learn more");
    });

    test('renders the "Watch video" button', () => {
        const { getAllByText } = render(HomeView);
        getAllByText("Watch video");
    });

    test('renders the "They trust us" section', () => {
        const { getAllByText } = render(HomeView);
        getAllByText("They trust us");
    });

    test('renders the "Let\'s get started" section', () => {
        const { getAllByText } = render(HomeView);
        getAllByText("Let's get started");
    });
});
