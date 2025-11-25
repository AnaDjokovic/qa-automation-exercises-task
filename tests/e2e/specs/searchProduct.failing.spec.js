const { test, chromium, expect } = require('@playwright/test');
const ProductsPage = require('../pageObjects/ProductsPage');
let productsPage;
let searchedCategory = 'Dress';

test.describe('Automation Exercise - Search product via input filed', () => {
  test.beforeEach(async ({ page }) => {
    productsPage = new ProductsPage(page);

    await productsPage.goToProducts();
  });

  test('TC-01: Search product via input filed, expect to get appropriate gategory', async () => {
    const result = await productsPage.filteredProductsItemsList(searchedCategory);
    const productsCount = result.productsCount;
    const products = result.products;

    expect(productsCount).toBeGreaterThan(0);

    products.map((singleProduct) => {
      expect(
        singleProduct.title,
        `Product title "${singleProduct.title}" does NOT contain ${searchedCategory}`,
      ).toContain(searchedCategory);
    });
  });
});
