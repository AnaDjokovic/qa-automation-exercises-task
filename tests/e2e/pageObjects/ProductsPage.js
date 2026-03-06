const BasePage = require('../helpers/BasePage');

class ProductsPage extends BasePage {
  constructor(page) {
    super(page);

    this.allItemsWrapper = page.locator('.features_items');
    this.productWrapper = page.locator('.product-image-wrapper');
    this.addToCart = page.locator('a').filter({ hasText: 'Add to cart' });
    this.continueShoppingBtn = page.locator('button:has-text("Continue Shopping")');
    this.viewCartBtn = page.locator('a:has-text("View Cart")');
  }

  async goToProducts() {
    return await this.goto('products');
  }

  async addToCartRandomProduct() {
    await this.allItemsWrapper.waitFor({ state: 'visible' });

    const products = this.allItemsWrapper.locator(this.productWrapper);
    const productsCount = await products.count();
    const randomIndex = Math.floor(Math.random() * productsCount);

    await products.nth(randomIndex).locator(this.addToCart).first().click();

    return randomIndex;
  }

  async multipleProducts(numberOfProductsToAdd) {
    for (let i = 0; i < numberOfProductsToAdd; i++) {
      await this.addToCartRandomProduct();
      await this.continueShoppingBtn.click();
    }

    return await this.goto('view_cart');
  }
}

module.exports = ProductsPage;
