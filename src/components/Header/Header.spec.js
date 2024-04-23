import { expect } from "@playwright/test";
import Header from "./Header";
// import "@testing-library/jest-dom"

import { render, screen } from "@testing-library/react";

describe("header component testing", () => {
    it("render component", () => {
        render(<Header />);
        const ele=screen.getByTestId("headingDir")
        expect(ele).toBeInTheDocument()
    })
    test("test header",()=>{
        render(<Header />)
        const ele=screen.getByTestId("headingDir")
        expect(ele.textContent).toBe("End to End Application")
    })
   
})