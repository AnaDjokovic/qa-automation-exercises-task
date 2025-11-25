class BasePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * This base navigation method ensures consistent routing across all Page Object classes
   *
   */
  async goto(url) {
    await this.page.goto(`/${url}`);

    return this.page.url();
  }
}

module.exports = BasePage;
