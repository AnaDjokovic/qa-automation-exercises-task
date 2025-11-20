const { test, expect } = require('@playwright/test');
const RequestsApi = require('../helpers/https-helper');
const convertRsdToUsd = require('../helpers/function-helper');
let getRequest, status, searchedItem, searchProductRequest;

test.describe('Automation Exercices API tests validation', () => {
  test.beforeEach(async ({ request }) => {
    getRequest = new RequestsApi(request);
  });

  test('TC01 - Get list of products', async () => {
    const getListRespons = await getRequest.getProductsList();

    status = getListRespons.jsonResponse.responseCode;
    const { products } = getListRespons.jsonResponse;
    const numberOfProducts = Object.keys(products).length;
    const listOfProperties = ['id', 'name', 'price', 'brand', 'category'];

    expect(status).toBe(200);
    expect(numberOfProducts).toBeGreaterThan(0);

    for (const product of products) {
      for (const property of listOfProperties) {
        expect(product).toHaveProperty(property);
      }
    }
  });

  test('TC02 - Verify search returns valid results', async () => {
    searchedItem = {
      search_product: 'shirt',
    };

    searchProductRequest = await getRequest.searchProduct(searchedItem);
    status = searchProductRequest.jsonResponse.responseCode;
    const { products } = searchProductRequest.jsonResponse;

    expect(status).toBe(200);

    for (const product of products) {
      const productCategory = product.category.category;

      expect(productCategory.toLowerCase()).toContain(`${searchedItem.search_product}`);
    }
  });

  test('TC03 - Search with multiple parameters', async () => {
    searchedItem = {
      search_product: 'shirt',
      brand: 'Polo',
      category: 'Man',
    };

    searchProductRequest = await getRequest.searchProduct(searchedItem);
    status = searchProductRequest.jsonResponse.responseCode;
    const { products } = searchProductRequest.jsonResponse;

    expect(status).toBe(200);

    const failedProducts = [];

    for (const product of products) {
      const productName = product.name;
      const productBrand = product.brand;
      const category = product.category.usertype.usertype;

      if (
        !productName.includes(searchedItem.search_product.toLowerCase()) ||
        !productBrand.includes(searchedItem.brand) ||
        !category.includes(searchedItem.category)
      ) {
        failedProducts.push(product);
      }
    }

    const failedNames = failedProducts.map((p) => p.name).join(', ');
    console.error(`The following products did not match searched criteria: ${failedNames}`);

    expect(failedProducts.length).toEqual(0);
  });

  test('TC04 - Product price range validation', async () => {
    const searchedItem = {
      search_product: 'shirt',
    };

    searchProductRequest = await getRequest.searchProduct(searchedItem);
    const exchageValue = await getRequest.exchangeCurrency();
    status = searchProductRequest.jsonResponse.responseCode;
    const { products } = searchProductRequest.jsonResponse;
    const exchangeMiddleUsd = await exchageValue.exchange_middle;

    expect(status).toBe(200);

    for (const product of products) {
      let price = Number(product.price.split(' ')[1]);

      const rsdToUsd = convertRsdToUsd(price, exchangeMiddleUsd);

      expect(rsdToUsd).toBeGreaterThanOrEqual(10);
      expect(rsdToUsd).toBeLessThan(50);
    }
  });

  test('TC05 - Response validation (GET)', async () => {
    const getListRespons = await getRequest.getProductsList();
    status = getListRespons.jsonResponse.responseCode;
    const { products } = getListRespons.jsonResponse;

    expect(status).toBe(200);

    for (const product of products) {
      const { id } = product;
      const { price } = product;
      const { name } = product;
      const { brand } = product;
      const category = product.category.usertype.usertype;

      expect(typeof name).toEqual('string');
      expect(typeof brand).toEqual('string');
      expect(typeof category).toEqual('string');
      expect(typeof id).toEqual('number');
      expect(typeof price === 'string' || typeof price === 'number').toBe(true);
    }
  });
});
