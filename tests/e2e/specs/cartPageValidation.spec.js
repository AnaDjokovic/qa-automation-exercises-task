const { test, expect } = require('@playwright/test');
const ProductDetailsPage = require('../pageObjects/ProductDetailsPage');
const CartPage = require('../pageObjects/CartPage');
let productDetailsPage, cartPage, quantityValue;
let productValues = [];

test.describe('Automation Exercise - Cart page validation', () => {
  test.beforeEach(async ({ page }) => {
    // Navigating to the cart page via product details page
    productDetailsPage = new ProductDetailsPage(page);
    cartPage = new CartPage(page);

    // Open first product details page
    await productDetailsPage.openFirstProduct();

    // Validate product details and store data
    const getProductValues = await productDetailsPage.productDetailsElementesValidation();
    quantityValue = await productDetailsPage.quantityInputValidation('3');

    productValues.push({
      title: getProductValues.productTitle.value,
      price: getProductValues.productPrice.value,
    });

    const cartPageUrl = await productDetailsPage.goToCartPage();

    expect(cartPageUrl).toContain('view_cart');
    expect(cartPageUrl).toEqual(page.url());
  });

  test('TC-01: Validate that the added product is displayed correctly in the cart', async () => {
    const cartValues = await cartPage.cartItemsValidation();

    expect(cartValues.image).toBe(true);
    expect(cartValues.title).toBe(`${productValues[0].title}`);
    expect(cartValues.price).toBe(`${productValues[0].price}`);
    expect(cartValues.quantity).toBe(quantityValue);
  });

  test('TC-02: Validate that removing an item clears the cart', async () => {
    const emptyCartNotification = await cartPage.removeItemFromCart();
    const getCartItemsCount = await cartPage.getCartItemsCount();

    expect(emptyCartNotification).toEqual('Cart is empty! Click here to buy products.');
    expect(getCartItemsCount).toEqual(0);
  });
});
