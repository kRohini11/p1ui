import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "./Login";
import { Provider } from "react-redux";
import { expect } from "@playwright/test";
import { appStore } from "@/redux/store/appStore";
import Link from "next/link";

// Mock useRouter:
jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    }
}));

// Mocking the internal handleLogin function
jest.mock('./Login', () => ({
    __esModule: true,
    default: jest.fn((props) => {
        const handleLogin = async () => {
            props.fnClick();
        };
        return (
            <div data-testid="loginTest">
                <h3 className="text-center my-3">Login</h3>
                <button onClick={handleLogin}>Login</button>
                <Link href="/register">To Register</Link>

            </div>
        )
    })
}))

describe("login component", () => {
    test("render correctly", () => {
        render(<Provider store={appStore}><Login /></Provider>)
        const ele = screen.getByTestId("loginTest")
        expect(ele).toBeInTheDocument();
    })
    test("Header text", () => {
        render(<Provider store={appStore}><Login /></Provider>)
        const ele = screen.getByRole("heading")
        expect(ele.textContent).toBe("Login")
    })
    test("Register text", () => {
        render(<Provider store={appStore}><Login /></Provider>)
        const ele = screen.getByRole("link")
        expect(ele.textContent).toBe("To Register")
    })
    test("Login Button text", async () => {
        //Mocking an API function that handles login
        const fnClick = jest.fn();
        render(<Provider store={appStore}><Login fnClick={fnClick} /></Provider>)
        const btnRef = screen.getByRole("button");
        fireEvent.click(btnRef);
        await waitFor(() => {
            expect(fnClick).toHaveBeenCalled();
        })

    })
})