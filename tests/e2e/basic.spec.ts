import { test, expect } from '@playwright/test';

// 基本首頁與 i18n 測試
const locales = ['en', 'zh'];

for (const locale of locales) {
  test.describe(`${locale} locale`, () => {
    test(`should load home page /${locale}`, async ({ page }) => {
      await page.goto(`/${locale}`);
      await expect(page).toHaveTitle(/Book Digest|書摘牆/);
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
    });

    test(`should navigate to about page /${locale}/about`, async ({ page }) => {
      await page.goto(`/${locale}/about`);
      await expect(page.locator('h1')).toBeVisible();
    });

    test(`should show not-found for invalid page /${locale}/not-exist`, async ({ page }) => {
      await page.goto(`/${locale}/not-exist`);
      await expect(page.locator('h1')).toContainText('404');
    });
  });
}

// 書籍牆與動態書籍頁面
for (const locale of locales) {
  test.describe(`${locale} books`, () => {
    test(`should load books wall /${locale}/books`, async ({ page }) => {
      await page.goto(`/${locale}/books`);
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('li').first()).toBeVisible();
    });
  });
}
