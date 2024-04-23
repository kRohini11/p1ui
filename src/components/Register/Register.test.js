import Register from "./Register";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Register component", () => {
    test("test", () => {
        render(<Register />)
        const ele = screen.getByTestId("register-div");
        expect(ele).toBeInTheDocument()
    })
    test("heading test", () => {
        render(<Register />)
        const ele = screen.getByRole("heading", { level: 3 })
        expect(ele.textContent).toBe("Register")
    })
    test("register test",  () => {
        render(<Register />)
        const btnRef = screen.getByRole("button", { name: "Register" })
         fireEvent.click(btnRef)
    })
    test("login test",  () => {
        render(<Register />)
        const btnRef = screen.getByRole("link",{name:"To Login"})
        expect(btnRef.getAttribute("href")).toBe("/login")
    })
})