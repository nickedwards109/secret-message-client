import Hmac from './HMAC';

class HTTPClient {
  generate_signature(httpMethod, url, httpVersion, key) {
    const upcase_HTTP_method = httpMethod.toUpperCase();
    const request_line = upcase_HTTP_method + ' ' + url + ' ' + httpVersion;

    const hmac = new Hmac();
    const signature = hmac.hash(request_line, key);

    return signature;
  }
}

export default HTTPClient;
