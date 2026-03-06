const BasePage = require('../helpers/BasePage');

class ProductDetailsPage extends BasePage {
  constructor(page) {
    super(page);

    this.allItemsWrapper = page.locator('.features_items');
    this.productWrapper = page.locator('.product-image-wrapper');
    this.viewProductButton = page.locator('a:has-text("View Product")');
    this.productDetails = page.locator('.product-details');
    this.productImage = page.locator('.view-product');
    this.productTitle = page.locator('.product-information h2');
    this.productCategory = page.locator('.product-information p:has-text("Category")');
    this.productPrice = page.locator('.product-information span span');
    this.productAvailability = page.locator('.product-information p:has-text("Availability")');
    this.productCondition = page.locator('.product-information p:has-text("Condition")');
    this.productBrand = page.locator('.product-information p:has-text("Brand")');
    this.quantityInput = page.locator('#quantity');
    this.addToCartBtn = page.locator('button:has-text("Add to cart")');
    this.modal = page.locator('#cartModal');
    this.modalText = page.locator('#cartModal .modal-body p').first();
    this.viewCartBtn = page.locator('a:has-text("View Cart")');
    this.continueShoppingBtn = page.locator('button:has-text("Continue Shopping")');
  }

  async goToProducts() {
    return await this.goto('products');
  }

  async openFirstProduct() {
    await this.goToProducts();
    await this.allItemsWrapper.waitFor({ state: 'visible' });

    await this.allItemsWrapper
      .locator(this.productWrapper)
      .first()
      .locator(this.viewProductButton)
      .click();

    await this.page.waitForLoadState('domcontentloaded');

    return this.page.url();
  }

  async productDetailsElementsValidation() {
    await this.productDetails.waitFor({ state: 'visible' });

    return {
      productImage: {
        visible: await this.productImage.isVisible(),
      },
      productTitle: {
        visible: await this.productTitle.isVisible(),
        value: await this.productTitle.textContent(),
      },
      productCategory: {
        visible: await this.productCategory.isVisible(),
        value: await this.productCategory.textContent(),
      },
      productPrice: {
        visible: await this.productPrice.isVisible(),
        value: await this.productPrice.textContent(),
      },
      productAvailability: {
        visible: await this.productAvailability.isVisible(),
      },
      productCondition: {
        visible: await this.productCondition.isVisible(),
      },
      productBrand: {
        visible: await this.productBrand.isVisible(),
        value: await this.productBrand.textContent(),
      },
      quantityInput: {
        visible: await this.quantityInput.isVisible(),
        value: await this.quantityInput.inputValue(),
      },
      addToCartBtn: {
        visible: await this.addToCartBtn.isVisible(),
      },
    };
  }

  async quantityInputValidation(numberOfItems) {
    await this.quantityInput.waitFor({ state: 'visible' });
    await this.quantityInput.fill(numberOfItems);

    return await this.quantityInput.inputValue();
  }

  async goToCartPage(quantity = '1') {
    await this.quantityInputValidation(quantity);
    await this.addToCartBtn.click();
    await this.modal.waitFor({ state: 'visible' });
    await this.viewCartBtn.waitFor({ state: 'visible' });
    await this.continueShoppingBtn.waitFor({ state: 'visible' });
    await this.viewCartBtn.click();

    return await this.page.url();
  }
}

module.exports = ProductDetailsPage;
