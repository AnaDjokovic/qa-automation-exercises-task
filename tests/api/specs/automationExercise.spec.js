const { test, expect } = require('@playwright/test');
const RequestsApi = require('../helpers/https-helper');
const convertRsdToUsd = require('../helpers/function-helper');

test.describe('Automation Exercise API tests validation', () => {
  let getRequest;

  test.beforeEach(async ({ request }) => {
    getRequest = new RequestsApi(request);
  });

  test('TC01 - Get list of products', { tag: ['@api', '@smoke'] }, async () => {
    const getListResponse = await getRequest.getProductsList();

    const { responseCode, products } = getListResponse.jsonResponse;
    const listOfProperties = ['id', 'name', 'price', 'brand', 'category'];

    expect(responseCode).toBe(200);
    expect(products.length).toBeGreaterThan(0);

    for (const product of products) {
      for (const property of listOfProperties) {
        expect(product).toHaveProperty(property);
      }
    }
  });

  test('TC02 - Verify search returns valid results', { tag: ['@api'] }, async () => {
    const searchedItem = { search_product: 'shirt' };

    const searchProductRequest = await getRequest.searchProduct(searchedItem);
    const { responseCode, products } = searchProductRequest.jsonResponse;

    expect(responseCode).toBe(200);

    for (const product of products) {
      expect(product.name.toLowerCase()).toContain(searchedItem.search_product);
    }
  });

  test('TC03 - Search with multiple parameters', { tag: ['@api'] }, async () => {
    const searchedItem = {
      search_product: 'shirt',
      brand: 'Polo',
      category: 'Man',
    };

    const searchProductRequest = await getRequest.searchProduct(searchedItem);
    const { responseCode, products } = searchProductRequest.jsonResponse;

    expect(responseCode).toBe(200);

    const failedProducts = [];

    for (const product of products) {
      const productName = product.name.toLowerCase();
      const productBrand = product.brand;
      const category = product.category.usertype.usertype;

      if (
        !productName.includes(searchedItem.search_product) ||
        !productBrand.includes(searchedItem.brand) ||
        !category.includes(searchedItem.category)
      ) {
        failedProducts.push(product);
      }
    }

    if (failedProducts.length > 0) {
      const failedNames = failedProducts.map((p) => p.name).join(', ');
      console.error(`Products not matching criteria: ${failedNames}`);
    }

    expect(failedProducts.length).toEqual(0);
  });

  test('TC04 - Product price range validation', { tag: ['@api'] }, async () => {
    const searchedItem = { search_product: 'shirt' };

    const searchProductRequest = await getRequest.searchProduct(searchedItem);
    const exchangeValue = await getRequest.exchangeCurrency();
    const { responseCode, products } = searchProductRequest.jsonResponse;
    const exchangeMiddleUsd = exchangeValue.exchange_middle;

    expect(responseCode).toBe(200);

    for (const product of products) {
      const price = Number(product.price.split(' ')[1]);
      const rsdToUsd = convertRsdToUsd(price, exchangeMiddleUsd);

      expect(rsdToUsd).toBeGreaterThanOrEqual(10);
      expect(rsdToUsd).toBeLessThan(50);
    }
  });

  test('TC05 - Response validation (GET)', { tag: ['@api', '@smoke'] }, async () => {
    const getListResponse = await getRequest.getProductsList();
    const { responseCode, products } = getListResponse.jsonResponse;

    expect(responseCode).toBe(200);

    for (const product of products) {
      const { id, price, name, brand } = product;
      const category = product.category.usertype.usertype;

      expect(typeof name).toEqual('string');
      expect(typeof brand).toEqual('string');
      expect(typeof category).toEqual('string');
      expect(typeof id).toEqual('number');
      expect(typeof price === 'string' || typeof price === 'number').toBe(true);
    }
  });
});
