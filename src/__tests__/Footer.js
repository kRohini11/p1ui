import { Footer } from "@/components/Footer";
import { expect } from "@playwright/test";
import { render,screen } from "@testing-library/react";

describe("Footer component",()=>{
    it("Footer it componennt",()=>{
        render(<Footer />)
        const ele=screen.getByTestId("footerId")
        expect(ele).toBeInTheDocument()
    })
    it("footer content",()=>{
        render(<Footer />)
        const ele=screen.getByTestId("footerId")
        expect(ele.textContent).toBe("© right belongs to me")
    })
    
})