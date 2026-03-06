const { test: base, expect } = require('@playwright/test');
const HomePage = require('./pageObjects/HomePage');
const ProductsPage = require('./pageObjects/ProductsPage');
const ProductDetailsPage = require('./pageObjects/ProductDetailsPage');
const CartPage = require('./pageObjects/CartPage');

exports.test = base.extend({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  productDetailsPage: async ({ page }, use) => {
    await use(new ProductDetailsPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});

exports.expect = expect;
