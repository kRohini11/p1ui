import { test, expect } from "@playwright/test"

test.beforeEach(async ({ page }) => {
    await page.goto('https://p1ui.vercel.app/login')
    await page.waitForTimeout(3000)
});

    test("Logout test", async ({ page }) => {
        await page.fill("#uid", "u2@gmail.com")
        await page.fill("#pwd", "u1234")
        await page.getByRole("button", { name: "Login" }).click();
        await page.waitForURL("https://p1ui.vercel.app/")
        await page.goto(page.url())
        await page.waitForTimeout(3000)
        await page.getByRole('listitem')
            .filter({ hasText: /Logout/ }).click()
        await page.getByTestId("modalCloseBtn").click();
        await page.waitForTimeout(3000)
    })
