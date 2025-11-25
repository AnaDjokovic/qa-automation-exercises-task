const { test, expect } = require('@playwright/test');
const HomePage = require('../pageObjects/HomePage');
const { expectedCategories, categoryProducts, brandList } = require('../helpers/data.helper');

let homePage;

test.describe('Automation Exercise - Home Page Validation', () => {
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goToHome();
  });

  test('TC-01: Navigation menu is visible', async ({ page }) => {
    const pageUrl = page.url();
    const menuItems = await homePage.navBarLinksVisibilityValidation();

    expect(page.url()).toContain('/');
    expect(menuItems.length).toBeGreaterThan(0);
  });

  test('TC-02: Category headers validation, expected categories are displayed', async () => {
    const actualCategories = await homePage.getAllCategoryHeaders();
    expect(actualCategories).toEqual(expect.arrayContaining(expectedCategories));
  });

  test('TC-03: Category Accordion expands/collapses, expect to display correct products', async () => {
    const productsPanelList = await homePage.getExpandedCategoryProducts();

    expect(Object.keys(productsPanelList).sort()).toEqual(Object.keys(categoryProducts).sort());

    for (const category of Object.keys(categoryProducts)) {
      const actualItems = productsPanelList[category];
      const expectedItems = categoryProducts[category];

      expect(actualItems.sort()).toEqual(expectedItems.sort());
    }
  });

  test('TC-04: Brand Items list shows products', async () => {
    const getBrandNameAndCount = await homePage.getBrandNameAndCount();

    getBrandNameAndCount.forEach((singleBrand) => {
      expect(singleBrand.count).toBeGreaterThan(0);
      expect(brandList).toContain(singleBrand.name);
    });
  });

  test('TC-05: Features Items list shows products', async () => {
    const featuresItemsList = await homePage.getFeaturesItemsList();
    const expectedNumberOfItems = await homePage.totalBrandsCount();

    expect(featuresItemsList.count).toBeGreaterThan(0);
    expect(featuresItemsList.count).toEqual(expectedNumberOfItems);

    featuresItemsList.isVisible.forEach((imageVisibility) => {
      expect(imageVisibility).toBe(true);
    });
  });

  test('TC-06: Product overlay functionality validation', async () => {
    const overlayContent = await homePage.productOverlay();

    expect(overlayContent.length).toBeGreaterThan(0);

    overlayContent.forEach((value) => {
      expect(typeof value).toBe('string');
      expect(value.trim().length).toBeGreaterThan(0);
    });
  });
});
