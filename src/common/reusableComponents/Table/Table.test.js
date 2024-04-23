import { expect } from "@playwright/test";
import Table from "./Table";

import { render, screen, within } from "@testing-library/react";

describe("Table component", () => {
    test("header props", () => {
        render(<Table headers={[]} rows={[]} tds={[]} />);
        const tableEle = screen.getByTestId("tableCmp");
        expect(tableEle).toBeInTheDocument()
    })
    test("without rows",()=>{
        render(<Table headers={[]} rows={[]} tds={[]} />)
        const tableEle=screen.getByTestId("no-data");
        expect(tableEle.textContent).toBe("No Data Found")
    })
    test("with rows and columns",()=>{
        render(<Table headers={["Name","Rollno"]} rows={[{name:"s1",rollno:1},{name:"s2",rollno:2}]} tds={["name","rollno"]} />)
        const ths=screen.getAllByRole("columnheader");
        expect(ths[0].textContent).toBe("Name")
        const rows=screen.getAllByRole("row")
        const cells=within(rows[1]).getAllByRole("cell")
        expect(cells[1].textContent).toBe("2")
    })
})