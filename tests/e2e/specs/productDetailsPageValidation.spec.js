const { test, expect } = require('@playwright/test');
const ProductDetailsPage = require('../pageObjects/ProductDetailsPage');
let productDetailsPage;

test.describe('Automation Exercise - Product Details page validation', () => {
  test.beforeEach(async ({ page }) => {
    productDetailsPage = new ProductDetailsPage(page);
    const detailsPageUrl = await productDetailsPage.openFirstProduct();

    expect(detailsPageUrl).toContain('product_details');
    expect(detailsPageUrl).toEqual(page.url());
  });

  test('TC-01: UI elements visibility validation', async () => {
    const productDetails = await productDetailsPage.productDetailsElementesValidation();

    Object.values(productDetails).map((singleElement) => {
      expect(singleElement.visible).toBe(true);
    });
  });

  test('TC-02: Quantity input filed validation, user is able to input value', async () => {
    const desiredQuantity = '3';
    const itemsAdded = await productDetailsPage.quantityInputValidation(desiredQuantity);

    expect(itemsAdded).toEqual(desiredQuantity);
  });
});
