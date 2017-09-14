import Cipher from './Cipher';

class HTTPClient {
  constructor(cipher) {
    this.cipher = cipher;
  }

  sign_request(xhr, method, url, httpVersion) {
    const upcase_HTTP_method = method.toUpperCase();
    const request_line = upcase_HTTP_method + ' ' + url + ' ' + httpVersion;
    const signature = this.cipher.encrypt(request_line);
    const initialization_vector = String(this.cipher.initialization_vector);
    xhr.open(method, url);

    // This comment is duplicated in the unit test for this method.
    // It turns out that an XMLHttpRequest object has no method for getting the
    //   values of request headers once they have been set. See the docs, where
    //   there are methods for setting request headers and getting response
    //   headers, but no methods for getting request headers:
    //   https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
    // I'd still like to test that the signature is being generated, but I can't
    //   directly get the values of headers from the XHR object.
    // So, I'm going to return an object from this method that contains both the
    //   XHR object itself as well as the signature and initialization vector.
    //   This will make it possible to unit test that the signature and
    //   initialization vector are in scope. BUT, we are still
    //   not testing that these values were set in request headers.

    // This all means that the following line of code must not be deleted!
    // If you delete these two lines of code, the tests will still pass, but you
    //   will be sending unsigned requests.
    xhr.setRequestHeader('Authorization', signature);
    xhr.setRequestHeader('IV', initialization_vector);

    // You can manually verify that the Authorization and IV headers are being
    //   set by uncommenting the following line and visually observing that the
    //   Authorization and IV headers exist and have strings as their values.
    // console.log(xhr);

    const results = { xhr: xhr, signature: signature, initialization_vector: initialization_vector };
    return results;
  }

  send_request(xhr) {
    xhr.send();
  }
}

export default HTTPClient;
