import Cipher from './Cipher';

class HTTPClient {
  sign_request(xhr, method, url) {
    const cipher = new Cipher();
    const HTTP_version = '1.1';
    const upcase_HTTP_method = method.toUpperCase();
    const request_line = upcase_HTTP_method + ' ' + url + ' ' + HTTP_version;
    const signature = cipher.encrypt(request_line);

    xhr.open(method, url);

    // This comment is duplicated in the unit test for this method.
    // It turns out that an XMLHttpRequest object has no method for getting the
    //   values of request headers once they have been set. See the docs, where
    //   there are methods for setting request headers and getting response
    //   headers, but no methods for getting request headers:
    //   https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
    // I'd still like to test that the signature is being generated, but I can't
    //   directly get the value of the Authorization header from the XHR object.
    // So, I'm going to return an object from this method that contains both the
    //   XHR object itself as well as the signature. This will make it possible
    //   to unit test that the signature is being generated. BUT, we are still
    //   not testing that the signature was set as a header in the request.
    // You can manually verify that the Authorization header is being set by
    //   uncommenting the following line and visually observing that the
    //   Authorization header exists and has a long string as its value.
    //   console.log(xhr);

    // This all means that the following line of code must not be deleted!
    // If you delete this line of code, the tests will still pass, but you will
    //   be sending unsigned requests. DO NOT DELETE xhr.setRequestHeader()!!!
    xhr.setRequestHeader('Authorization', signature);

    const results = { xhr: xhr, signature: signature };
    return results;
  }
}

export default HTTPClient;
