import Students from "./Students";
import { render,screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { appStore } from "@/redux/store/appStore";


describe("student component",()=>{
   
    test("render test",()=>{
        render(<Provider store={appStore}><Students/></Provider>)
        const ele=screen.getByTestId("student-div")
        expect(ele).toBeInTheDocument()
    })
    test("heading test",()=>{
        render(<Provider store={appStore}><Students/></Provider>)
        const ele=screen.getByRole("heading",{level:4})
        expect(ele.textContent).toBe("Students")
    })
})