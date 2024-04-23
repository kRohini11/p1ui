import Profile from "./Profile";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { appStore } from "@/redux/store/appStore";

jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    }
}));

describe("profile component", () => {
    test("render test", () => {
        render(<Provider store={appStore}><Profile /></Provider>)
        const ele = screen.getByTestId("profile-div")
        expect(ele).toBeInTheDocument()
    })
    test("heading test", () => {
        render(<Provider store={appStore}><Profile /></Provider>)
        const ele = screen.getByRole("heading", { level: 3 })
        expect(ele.textContent).toBe("Profile")
    })
    test("update test", async () => {
        render(<Provider store={appStore}><Profile /></Provider>)
        const btnRef = screen.getByRole("button", { name: "Update" })
        await fireEvent.click(btnRef)
    })
    test("delete test",()=>{
        render(<Provider store={appStore}><Profile /></Provider>)
        const btnRef=screen.getByRole("button",{name:"Delete"})
        fireEvent.click(btnRef)
    })
})