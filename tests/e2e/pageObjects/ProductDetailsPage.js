const BasePage = require('../helpers/BasePage');

class ProductDetailsPage extends BasePage {
  constructor(page) {
    super(page);

    // Locators list
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
    ((this.modal = page.locator('#cartModal')),
      (this.modalText = page.locator('#cartModal .modal-body p').first()));
    this.viewCartBtn = page.locator('a:has-text("View Cart")');
    this.continueShoppingBtn = page.locator('button:has-text("Continue Shopping")');
  }

  /**
   * Navigates directly to the Products page
   */
  async goToProducts() {
    return await this.page.goto('products');
  }

  /**
   * Opens the first product displayed on the Products page
   * Steps:
   * 1. Navigate to Products page
   * 2. Wait until all product items are visible
   * 3. Click the "View Product" button on the first product card
   */
  async openFirstProduct() {
    await this.goToProducts();
    await this.allItemsWrapper.waitFor({ state: 'visible' });

    await this.allItemsWrapper
      .locator(this.productWrapper)
      .first()
      .locator(this.viewProductButton)
      .click();

    return this.page.url();
  }

  /**
   * Validates visibility and text content of all elements on the product details page
   * Returns a structured object containing visibility status and values for all elements
   */
  async productDetailsElementesValidation() {
    await this.productDetails.waitFor({ state: 'visible' });
    const productInfo = {
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

    return productInfo;
  }

  /**
   * Input the desired quantity into the quantity input field
   */
  async quantityInputValidation(nuberOfItems) {
    await this.quantityInput.waitFor({ state: 'visible' });
    await this.quantityInput.fill(nuberOfItems);

    return await this.quantityInput.inputValue();
  }

  /**
   * Adds the product to the cart and navigates to the Cart page
   * Steps:
   * 1. Inputs quantity - in test is set value 3
   * 2. Clicks "Add to cart"
   * 3. Waits for modal to appear
   * 4. Clicks "View Cart" buttton
   */
  async goToCartPage() {
    await this.quantityInputValidation('3');
    await this.addToCartBtn.click();
    await this.modal.waitFor({ state: 'visible' });
    await this.viewCartBtn.waitFor({ state: 'visible' });
    await this.continueShoppingBtn.waitFor({ state: 'visible' });
    await this.viewCartBtn.click();

    return await this.page.url();
  }
}

module.exports = ProductDetailsPage;
