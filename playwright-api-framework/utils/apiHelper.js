export class ApiHelper {
  constructor(request) {
    this.request = request;
  }

  async get(endpoint) {
    const response = await this.request.get(endpoint);
    return response;
  }

  async post(endpoint, body) {
    const response = await this.request.post(endpoint, { data: body });
    return response;
  }

  async put(endpoint, body) {
    const response = await this.request.put(endpoint, { data: body });
    return response;
  }

  async patch(endpoint, body) {
    const response = await this.request.patch(endpoint, { data: body });
    return response;
  }

  async delete(endpoint) {
    const response = await this.request.delete(endpoint);
    return response;
  }
}