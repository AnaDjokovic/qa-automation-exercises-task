class CartPage {
  constructor(page) {
    this.page = page;

    // Locators list
    this.cartInfoTable = page.locator('#cart_info');
    this.cartProductTitle = page.locator('.cart_description h4 a');
    this.cartProductPrice = page.locator('.cart_price p');
    this.cartProductQuantity = page.locator('.disabled');
    this.cartProductImage = page.locator('.cart_product img');
    this.removeItem = page.locator('.cart_quantity_delete');
    this.cartRows = page.locator('#cart_info_table tbody tr');
    this.emptyCart = page.locator('#empty_cart');
  }

  /**
   * Validates that cart product details (image, title, price, quantity)
   * are visible and correctly loaded on the Cart page
   *
   */
  async cartItemsValidation() {
    await this.cartInfoTable.waitFor({ state: 'visible' });
    await this.cartProductQuantity.waitFor({ state: 'visible' });

    const cartProductInfo = {
      image: await this.cartProductImage.isVisible(),
      title: await this.cartProductTitle.textContent(),
      price: await this.cartProductPrice.textContent(),
      quantity: await this.cartProductQuantity.innerText(),
    };

    return cartProductInfo;
  }

  /**
   * Removes all products from the cart by clicking the delete icon for
   * each cart item
   * After removing all items, waits for the "empty cart" message to appear
   */
  async removeItemFromCart() {
    const count = await this.removeItem.count();

    for (let i = 0; i < count; i++) {
      await this.removeItem.nth(0).click();
      await this.page.waitForTimeout(500);
    }

    await this.emptyCart.waitFor({ state: 'visible' });

    return (await this.emptyCart.textContent()).trim();
  }

  /**
   * Retrieves the total number of product rows currently present in the cart table
   *
   */
  async getCartItemsCount() {
    return await this.cartRows.count();
  }
}

module.exports = CartPage;
