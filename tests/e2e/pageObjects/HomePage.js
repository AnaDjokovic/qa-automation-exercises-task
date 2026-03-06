const BasePage = require('../helpers/BasePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);

    this.navBarLinks = page.locator('.nav.navbar-nav li a');
    this.home = page.getByRole('link', { name: 'Home ' });
    this.accordian = page.locator('.category-products .badge');
    this.categoryHeaders = page.locator('.panel-title');
    this.categoryPanels = page.locator('.category-products .panel');
    this.itemList = page.locator('.panel-body ul');
    this.featuresItemsWrapper = page.locator('.features_items');
    this.productImageWrapper = page.locator('.product-image-wrapper');
    this.productOverlayClass = page.locator('.product-overlay');
    this.overlayContent = page.locator('.overlay-content');
    this.brandsNameWrapper = page.locator('div.brands-name');
  }

  async goToHome() {
    return await this.goto();
  }

  /**
   * Returns text content of all visible navigation bar links.
   */
  async getNavBarLinksText() {
    const navItems = await this.navBarLinks.all();
    const navTextList = [];

    for (const item of navItems) {
      const itemText = await item.textContent();
      navTextList.push(itemText);
    }

    return navTextList;
  }

  async getAllCategoryHeaders() {
    const categories = await this.categoryHeaders.allTextContents();

    return categories.map((t) => t.trim());
  }

  /**
   * Expands each category accordion panel, collects items inside,
   * and returns an object mapping category name to its product list.
   */
  async getExpandedCategoryProducts() {
    const productsCount = await this.accordian.count();
    const result = {};

    for (let i = 0; i < productsCount; i++) {
      const productLink = await this.accordian.nth(i);
      await productLink.click();
      const category = await this.getAllCategoryHeaders();

      const productsPanelList = await this.itemList.nth(i).allInnerTexts();
      const itemsArray = productsPanelList
        .flatMap((text) => text.split('\n'))
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      result[category[i]] = itemsArray;
    }

    return result;
  }

  async getBrandNameAndCount() {
    await this.brandsNameWrapper.waitFor({ state: 'visible' });
    const brandItem = await this.brandsNameWrapper.locator('ul li').allTextContents();

    return brandItem.map((item) => {
      const match = item.match(/\((\d+)\)(.+)/);

      return {
        count: Number(match[1]),
        name: match[2].trim(),
      };
    });
  }

  async totalBrandsCount() {
    const getCount = await this.getBrandNameAndCount();

    return getCount.reduce((sum, brand) => sum + Number(brand.count), 0);
  }

  async getFeaturesItemsList() {
    await this.featuresItemsWrapper.waitFor({ state: 'visible' });
    const products = this.featuresItemsWrapper.locator(this.productImageWrapper);
    const productsCount = await products.count();
    const productsAreVisible = [];

    for (let i = 0; i < productsCount; i++) {
      const isVisible = await products.nth(i).isVisible();
      productsAreVisible.push(isVisible);
    }

    return { count: productsCount, isVisible: productsAreVisible };
  }

  async productOverlay() {
    await this.productImageWrapper.first().waitFor({ state: 'visible' });
    await this.productImageWrapper.first().hover();
    await this.productOverlayClass.first().waitFor({ state: 'visible' });
    await this.overlayContent.first().waitFor({ state: 'visible' });

    const trimmedText = await this.overlayContent.first().textContent();
    const overlayedTextTrimmed = trimmedText
      .split('\n')
      .map((t) => t.trim())
      .filter((t) => t !== '');

    return overlayedTextTrimmed;
  }
}

module.exports = HomePage;
