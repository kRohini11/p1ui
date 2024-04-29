const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('https://p1ui.vercel.app/login');
    await page.waitForTimeout(3000)
});

test('render correctly', async ({ page }) => {
    await expect(page).toHaveTitle(/etoe/);
});

test('header text', async ({ page }) => {
    const ele = page.getByTestId("headingDir")
    await expect(ele).toHaveText("End to End Application")
});

test('footer text', async ({ page }) => {
    const ele = page.getByTestId("footerId")
    await expect(ele).toHaveText("© right belongs to me")
});

test('get started link', async ({ page }) => {
    await page.getByRole('link', { name: 'To Register' }).click();
    await page.waitForTimeout(3000)
    await expect(page.getByRole('heading', { name: 'Register' })).toBeVisible();
});

test('login', async ({ page }) => {
    await page.fill("#uid", "u2@gmail.com")
    await page.fill("#pwd", "u1234")
    // await page.waitForTimeout(3000)
    await page.getByRole("button", { name: "Login" }).click()
    await page.waitForURL("https://p1ui.vercel.app/")
    await page.waitForTimeout(3000)
    await page.goto(page.url())
})