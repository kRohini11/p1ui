
import { Menu } from "./Menu";
import { render,screen } from "@testing-library/react";

// Mock useRouter:
jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    }
}));

describe("menu component test",()=>{
    it("heading",()=>{
        render(<Menu />)
        const ele=screen.getByTestId("menu-test-id");
        expect(ele).toBeInTheDocument();
    })
    it("menu length",()=>{
        render(<Menu />)
        const eleMenu=screen.getAllByRole("listitem");
        expect(eleMenu.length).toBe(4)
    })
    it("menuItems texts",()=>{
        render(<Menu />)
        const text=screen.getAllByRole("link")
        expect(text[0].textContent).toBe("Home")
        expect(text[0].getAttribute("href")).toBe("home");
    })
})