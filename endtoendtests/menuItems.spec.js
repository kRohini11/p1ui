import { test, expect } from "@playwright/test"

test.beforeEach(async ({ page }) => {
    await page.goto('https://p1ui.vercel.app/login')
    await page.waitForTimeout(3000)
});

test("menu items", async ({ page }) => {
    await page.fill("#uid", "u2@gmail.com")
    await page.fill("#pwd", "u1234")
    await page.getByRole("button", { name: "Login" }).click()
    await page.waitForURL("http://localhost:3000/")
    await page.goto(page.url())
    await page.getByRole("link", { name: 'Home' }).click()
    const ele = page.getByRole("heading", { name:"Welcome" })
    await expect(ele).toBeVisible()
    await page.waitForTimeout(3000)
    await page.getByRole("link", { name: "Profile" }).click()
    const profile = page.getByRole("heading", { name: "Profile" })
    //profile
    await expect(profile).toBeVisible()
    await page.waitForTimeout(3000)
    await page.getByRole("link", { name: "Users" }).click()
    const users = page.getByRole("heading", { name: "Students" })
    await expect(users).toBeVisible()
    await page.waitForTimeout(3000)
    await page.getByRole("Button", { name: "Next" }).click
    const currPageEle = page.getByTestId("currPage")
    expect(currPageEle).toHaveText("1")
    await page.waitForTimeout(3000)
    await page.getByRole("listitem")
        .filter({ hasText: /Logout/ }).click()
    await page.waitForTimeout(3000)
    const modalHeading = await page.getByRole("heading", { name: "Are u sure..." })
    await expect(modalHeading).toBeVisible()
    const okBtn = await page.getByRole("button", { name: "OK" })
    await expect(okBtn).toBeVisible()
    await okBtn.click();
    await page.waitForURL("https://p1ui.vercel.app/login")
    await page.waitForTimeout(3000)
})
