import Hmac from './HMAC';
import axios from 'axios';
import Cipher from './Cipher';
const key = require('./secrets').key

class HTTPClient {
  getMessage() {
    const httpMethod = 'GET';
    // Use localhost for development
    // Later, this will be replaced with a production endpoint
    const url = 'http://localhost:3000/api/v1/secret_messages/1';
    const httpVersion = 'HTTP/1.1';
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

  decryptHTTP(response) {
    const decrypted_output = response.data.messages.map((element) => {
      const encrypted = element.message;
      const initialization_vector = element.initialization_vector;
      // console.log(encrypted);
      // console.log(initialization_vector);
      const cipher = new Cipher(key, initialization_vector);
      const decrypted = cipher.decrypt(encrypted)
      return decrypted;
    });
    return decrypted_output;
  }
}

export default HTTPClient;
