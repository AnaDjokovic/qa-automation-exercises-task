const { test, expect } = require('../fixtures');
const { emptyCartNotification } = require('../helpers/data.helper');

test.describe('Automation Exercise - Cart page validation', () => {
  const desiredQuantity = '3';
  let productValues;

  test.beforeEach(async ({ productDetailsPage }) => {
    await productDetailsPage.openFirstProduct();

    const getProductValues = await productDetailsPage.productDetailsElementsValidation();
    await productDetailsPage.quantityInputValidation(desiredQuantity);

    productValues = {
      title: getProductValues.productTitle.value,
      price: getProductValues.productPrice.value,
    };

    const cartPageUrl = await productDetailsPage.goToCartPage(desiredQuantity);

    expect(cartPageUrl).toContain('view_cart');
  });

  test(
    'TC-01: Validate that the added product is displayed correctly in the cart',
    { tag: ['@smoke', '@cart'] },
    async ({ cartPage }) => {
      const cartValues = await cartPage.cartItemsValidation();

      expect(cartValues.image).toBe(true);
      expect(cartValues.title).toBe(productValues.title);
      expect(cartValues.price).toBe(productValues.price);
      expect(cartValues.quantity).toBe(desiredQuantity);
    },
  );

  test(
    'TC-02: Validate that removing an item clears the cart',
    { tag: ['@regression', '@cart'] },
    async ({ cartPage }) => {
      const emptyCartText = await cartPage.removeItemFromCart();
      const getCartItemsCount = await cartPage.getCartItemsCount();

      expect(emptyCartText).toEqual(emptyCartNotification);
      expect(getCartItemsCount).toEqual(0);
    },
  );
});
