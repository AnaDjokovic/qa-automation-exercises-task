/**
 * A class for API requests used for Automation Exercices project
 */
class RequestsApi {
  constructor(request) {
    this.request = request;
  }

  /**
   * Function for retriving the products list
   */
  async getProductsList() {
    const response = await this.request.get('/api/productsList');

    const bufferParse = await response.body();
    const jsonResponse = JSON.parse(bufferParse.toString());

    return { response, jsonResponse };
  }

  /**
   * Function for searching a product using form data
   * @param { Object } body
   * Body request should be in form like { search_product: 'T-shirt' }
   */
  async searchProduct(body) {
    const response = await this.request.post('/api/searchProduct', {
      form: body,
    });

    const bufferParse = await response.body();
    const jsonResponse = JSON.parse(bufferParse.toString());

    return { response, jsonResponse };
  }

  /**
   * Function used for fetching current USD-to-RSD exchange rate
   */
  async exchangeCurrency() {
    const response = await this.request.get(
      'https://kurs.resenje.org/api/v1/currencies/usd/rates/today',
    );

    return response.json();
  }
}

module.exports = RequestsApi;
