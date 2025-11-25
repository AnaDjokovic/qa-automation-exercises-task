const BasePage = require('../helpers/BasePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);

    // Locators list
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

  /**
   * Navigates to the Home page using BasePage.goto().
   */
  async goToHome() {
    return await this.goto();
  }

  /**
   * Validates visibility of all navigation bar links and returns their text
   * Iterates through nav elements, checks if visible, extracts text
   */
  async navBarLinksVisibilityValidation() {
    const navItems = await this.navBarLinks.all();
    const navTextList = [];

    for (const item of navItems) {
      await item.isVisible();

      const itemText = await item.textContent();

      navTextList.push(itemText);
    }

    return navTextList;
  }

  /**
   * Retrieves all category header texts displayed in the category section
   * Trims extra spacing from each header
   */
  async getAllCategoryHeaders() {
    const categories = await this.categoryHeaders.allTextContents();
    const trimmedText = categories.map((t) => t.trim());

    return trimmedText;
  }

  /**
   * Expands each category accordion panel, collects items inside,
   * trims and cleans values, and returns an object
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

  /**
   * Extracts all brand items and parses their text into objects
   */
  async getBrandNameAndCount() {
    await this.brandsNameWrapper.waitFor({ state: 'visible' });
    const brandItem = await this.brandsNameWrapper.locator('ul li').allTextContents();
    const cleaned = brandItem.map((item) => {
      const match = item.match(/\((\d+)\)(.+)/); // remove spaces, special character and new lines

      return {
        count: Number(match[1]),
        name: match[2].trim(),
      };
    });

    return cleaned;
  }

  /**
   * Calculates the total number of brand items displayed across all brands
   * Sums the numeric count extracted from each brand item
   */
  async totalBrandsCount() {
    const getCount = await this.getBrandNameAndCount();
    const totalCount = getCount.reduce((sum, brand) => {
      return sum + Number(brand.count);
    }, 0);

    return totalCount;
  }

  /**
   * Validates that all product items displayed in the "Features Items" section are visible
   * Returns the count and array of visibility booleans
   */

  async getFeaturesItemsList() {
    await this.featuresItemsWrapper.waitFor({ state: 'visible' });
    const products = this.featuresItemsWrapper.locator(this.productImageWrapper);
    const productsCount = await products.count();
    let productsAreVisible = [];

    for (let i = 0; i < productsCount; i++) {
      const isVisible = await products.nth(i).isVisible();
      productsAreVisible.push(isVisible);
    }

    return { count: productsCount, isVisible: productsAreVisible };
  }

  /**
   * Hovers over the first product to reveal the overlay, waits for overlay to appear
   * extracts overlay text, removes empty rows/new lines, trims spacing.
   */
  async productOverlay() {
    await this.productImageWrapper.first().waitFor({ state: 'visible' });
    await this.productImageWrapper.first().hover();
    await this.productOverlayClass.first().waitFor({ state: 'visible' });
    await this.overlayContent.first().waitFor({ state: 'visible' });

    const trimmedText = await this.overlayContent.first().textContent();
    const overlayedTextTrimmed = trimmedText // used to remove spaces and new lines
      .split('\n')
      .map((t) => t.trim())
      .filter((t) => t !== '');

    return overlayedTextTrimmed;
  }
}

module.exports = HomePage;
