import Hmac from '../crypto/HMAC';
import axios from 'axios';
import Cipher from '../crypto/Cipher';
const key = require('../secrets').key

class HTTPClient {
  getMessages() {
    const httpMethod = 'GET';
    // Use localhost for development
    // Later, this will be replaced with a production endpoint
    const url = 'http://localhost:3000/api/v1/secret_messages';
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
      const cipher = new Cipher(key, initialization_vector);
      const decrypted = cipher.decrypt(encrypted)
      return decrypted;
    });
    return decrypted_output;
  }

  authenticate(response) {
    const decrypted_output = this.decryptHTTP(response);
    const valid_signatures = this.generateValidSignatures(decrypted_output);
    const response_signatures = this.getResponseSignatures(response);
    const authentications = this.getValidResponseSignatures(valid_signatures, response_signatures)

    if (authentications.length === valid_signatures.length) { return true ;}
    else { return false; }
  }

  generateValidSignatures(messages) {
    const hmac = new Hmac();
    return messages.map((message, index) => {
      return hmac.hash(message);
    });
  }

  getResponseSignatures(response) {
    return response.data.messages.map((element) => {
      return element.signature;
    });
  }

  getValidResponseSignatures(valid_signatures, response_signatures) {
    return response_signatures.filter((element, index) => {
      return element === valid_signatures[index];
    });
  }
}

export default HTTPClient;
