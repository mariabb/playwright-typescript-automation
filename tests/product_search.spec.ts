import { test, expect } from '@playwright/test';

test('user can search for a product', async ({ page }) => {
  await page.goto('https://automationexercise.com/');

  // Verify that the home page loads successfully
  await expect(page).toHaveTitle(/Automation Exercise/);

  const consentButton = page.getByRole('button', {
    name: 'Consent',
    exact: true,
  });

  await expect(consentButton).toBeVisible();
  await consentButton.click();

  // Navigate to the Products page
  await page.locator('a[href="/products"]').click();

  // Verify that the Products page is displayed
  await expect(page).toHaveURL(/\/products/);

  const searchInput = page.getByPlaceholder('Search Product');

  await expect(searchInput).toBeVisible();
  await searchInput.fill('Dress');

  // Verify that the search input contains the expected value
  await expect(searchInput).toHaveValue('Dress');

  await page.locator('#submit_search').click();

  // Verify that search results are displayed
  const searchResults = page.locator(
    '.features_items .product-image-wrapper'
  );

  await expect(searchResults.first()).toBeVisible();
});