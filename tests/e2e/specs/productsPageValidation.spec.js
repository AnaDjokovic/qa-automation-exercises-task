const { test, chromium, expect } = require('@playwright/test');
const ProductsPage = require('../pageObjects/ProductsPage');
const CartPage = require('../pageObjects/CartPage');
const { emptyCartNotification } = require('../helpers/data.helper');
let browser, context, page, productsPage, cartPage, getCartItemsCount;
let numberOfProductsToBeAdded = 4;

test.describe('Automation Exercise - Product page validation', () => {
  test.beforeAll(async () => {
    /**
     * For this test suite, we need to use the same browser context and page for all tests
     * This is required to validate the cart items count
     * In the beforeAll hook we initialize the page
     */
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);

    const pageUrl = await productsPage.goToProducts();

    expect(pageUrl).toEqual(page.url());
  });

  test('TC-01: Add multiple radnom products to the cart', async () => {
    const cartPageUrl = await productsPage.multipleProducts(numberOfProductsToBeAdded);

    expect(cartPageUrl).toEqual(page.url());
  });

  test('TC-02: Products are successfully added to the cart', async () => {
    getCartItemsCount = await cartPage.getCartItemsCount();

    expect(getCartItemsCount).toEqual(numberOfProductsToBeAdded);
  });

  test.afterAll('Delete items from cart', async () => {
    const emptyCartNotification = await cartPage.removeItemFromCart();
    getCartItemsCount = await cartPage.getCartItemsCount();

    expect(emptyCartNotification).toEqual(emptyCartNotification);
    expect(getCartItemsCount).toEqual(0);
  });
});
