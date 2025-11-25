const BasePage = require('../helpers/BasePage');

class ProductsPage extends BasePage {
  constructor(page) {
    super(page);

    // Locators list
    this.allItemsWrapper = page.locator('.features_items');
    this.productWrapper = page.locator('.product-image-wrapper');
    this.featuresItemsWrapper = page.locator('.features_items');
    this.productImageWrapper = page.locator('.product-image-wrapper');
    this.addToCart = page.locator('a').filter({ hasText: 'Add to cart' });
    this.continueShoppingBtn = page.locator('button:has-text("Continue Shopping")');
    this.viewCartBtn = page.locator('a:has-text("View Cart")');
    this.removeItem = page.locator('.cart_quantity_delete');
    this.cartRows = page.locator('#cart_info_table tbody tr');
    this.emptyCart = page.locator('#empty_cart');
    this.searchInput = page.locator('#search_product');
    this.searchBtn = page.locator('#submit_search');
  }

  /**
   * Navigates directly to the Products page using the BasePage `goto()` method
   */
  async goToProducts() {
    return await this.goto('products');
  }

  /**
   * Selects a random product from the Products list and clicks the “Add to cart” button
   */
  async addToCartRandomProduct() {
    await this.allItemsWrapper.waitFor({ state: 'visible' });

    const products = this.allItemsWrapper.locator(this.productWrapper);
    const productsCount = await products.count();
    const randomIndex = Math.floor(Math.random() * productsCount);

    await products.nth(randomIndex).locator(this.addToCart).first().click();

    return randomIndex;
  }

  /**
   * Returns the total number of product rows currently displayed in the cart table
   */
  async getCartItemsCount() {
    return await this.cartRows.count();
  }

  /**
   * Adds multiple random products to the cart
   * After each product is added, the “Continue Shopping” button is clicked to allow adding the next product
   */
  async multipleProducts(numberOfProductsToAdd) {
    for (let i = 0; i < numberOfProductsToAdd; i++) {
      await this.addToCartRandomProduct();
      await this.continueShoppingBtn.click();
    }

    return await this.goto('view_cart');
  }

  /**
   * Removes ALL items from the cart one by one by clicking the delete icon
   * After all items are removed, waits for the empty-cart message to appear
   */
  async removeAllItemsFromCart() {
    const count = await this.removeItem.count();

    for (let i = 0; i < count; i++) {
      await this.removeItem.nth(0).click();
      await this.page.waitForTimeout(500);
    }

    await this.emptyCart.waitFor({ state: 'visible' });
    const emptyCartNotification = await this.emptyCart.textContent().trim();

    return emptyCartNotification;
  }

  async searchProductByChategory(category) {
    await this.searchInput.waitFor({ state: 'visible' });
    await this.searchInput.click();
    await this.searchInput.fill(category);
    await this.searchBtn.click();
  }

  async filteredProductsItemsList(category) {
    await this.searchProductByChategory(category);
    await this.featuresItemsWrapper.waitFor({ state: 'visible' });
    const productsResult = this.featuresItemsWrapper.locator(this.productImageWrapper);
    const productsCount = await productsResult.count();

    const products = [];

    for (let i = 0; i < productsCount; i++) {
      const title = await productsResult.nth(i).locator('p').first().textContent();

      products.push({
        number: i,
        title: title.trim(),
      });
    }

    return {
      productsCount,
      products,
    };
  }
}

module.exports = ProductsPage;
