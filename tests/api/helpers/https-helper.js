class RequestsApi {
  constructor(request) {
    this.request = request;
  }

  async getProductsList() {
    const response = await this.request.get('/api/productsList');

    if (!response.ok()) {
      throw new Error(`GET /api/productsList failed with status ${response.status()}`);
    }

    const bufferParse = await response.body();
    const jsonResponse = JSON.parse(bufferParse.toString());

    return { response, jsonResponse };
  }

  /**
   * @param {Object} body - Form data, e.g. { search_product: 'T-shirt' }
   */
  async searchProduct(body) {
    const response = await this.request.post('/api/searchProduct', {
      form: body,
    });

    if (!response.ok()) {
      throw new Error(`POST /api/searchProduct failed with status ${response.status()}`);
    }

    const bufferParse = await response.body();
    const jsonResponse = JSON.parse(bufferParse.toString());

    return { response, jsonResponse };
  }

  async exchangeCurrency() {
    const response = await this.request.get(
      'https://kurs.resenje.org/api/v1/currencies/usd/rates/today',
    );

    if (!response.ok()) {
      throw new Error(`Exchange rate API failed with status ${response.status()}`);
    }

    return response.json();
  }
}

module.exports = RequestsApi;
