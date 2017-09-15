import Hmac from './HMAC';
import axios from 'axios';

class HTTPClient {
  getMessage() {
    const httpMethod = 'GET';
    // This is a placeholder API endpoint from a former project.
    // This endpoint does not authenticate the request.
    // Soon I'll replace this with an endpoint that checks the Authorization
    //  header to authenticate the request.
    const url = 'https://cody-nick-rails-engine.herokuapp.com/api/v1/items/random.json';
    const httpVersion = 'HTTP/1.1';
    const key = require('./secrets').key;
    const signature = this.generateSignature(httpMethod, url, httpVersion, key);
    const axiosInstance = axios.create({
      headers: {'Authorization': signature}
    });
    return axiosInstance.get(url);
  }

  generateSignature(httpMethod, url, httpVersion, key) {
    const upcase_HTTP_method = httpMethod.toUpperCase();
    const request_line = upcase_HTTP_method + ' ' + url + ' ' + httpVersion;

    const hmac = new Hmac();
    const signature = hmac.hash(request_line, key);

    return signature;
  }
}

export default HTTPClient;
