import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://127.0.0.1:3000/');
  });
test('has title', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/English Words/i);
  await expect(page.getByRole('heading', {name: /Unlock the power of language knowledge/i})).toBeDefined();
});

test('get started link', async ({ page }) => {
  // Click the get started link.
  await page.getByRole('link', { name: /Get started/i }).click();
  await expect(page.getByPlaceholder(/search a word/i)).toBeInViewport();
  await expect(page.getByRole('button', {name: /workout/i})).toBeInViewport();
});
