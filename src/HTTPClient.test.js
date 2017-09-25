import HTTPClient from './HTTPClient';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

// !!! IMPORTANT !!!
// In order for these tests to work, you need to make a file src/secrets.js
//  with the following line:
//  export const key = '1416fd3c3f607646eb2716140a37cc69';
//
// These tests are coupled to this key. This key will not give you access to
//  the production server, but it will get the tests to pass.

describe('HTTPClient', () => {
  it('generates a digital signature from the HTTP request line', () => {
    const httpMethod = 'GET';
    const url = 'https://secret-message-server.herokuapp.com/api/v1/secret_messages/1.json';
    const httpVersion = 'HTTP/1.1';
    const key = '56a608dd0976a0e4727e6be306dcfe20fbb8f9017ae34ad82ae338a701b53ddde73a7ab2daf08ef54d375160996c3fb4bf5eab21d73a8eeb9246f93195598cc7';

    const httpClient = new HTTPClient();
    const signature = httpClient.generateSignature(httpMethod, url, httpVersion, key);
    const expected_signature = '39ad2d7e2bfa55806f3369c618bd41d5d746bca22839499c073dd3146fbaf720';

    expect(typeof signature).toEqual('string');
    expect(signature).toEqual(expected_signature);
  });

  it('decrypts a cipher from an API response', () => {
    const cipher = '3d572c2020a2b8bd7975a89cc363047bd6b06eb5abcd116485f1dc2f37e4954e7c0fd9fe97df94d3f463b99ab213efe5';
    const initialization_vector = 'c333cbcfc5a6aad5';
    const mockServer = new MockAdapter(axios);
    mockServer.onGet('http://localhost:3000/api/v1/secret_messages/1').reply(
      200,
      {'messages':[
        {'message':cipher, 'initialization_vector':initialization_vector}
      ]},
    );

    axios.get('http://localhost:3000/api/v1/secret_messages/1')
      .then((response) => {
        const httpClient = new HTTPClient();
        const decrypted = httpClient.decryptHTTP(response);
        expect(decrypted).toEqual(["There's always money in the banana stand."]);
      });
  });

  it('decrypts multiple ciphers from an API response', () => {
    const cipher1 = '0598ec2218dff43626fe528178b14cfeccaa7854e78dc8e44acac0c799b74c11305352a19b58ee75006b4a942bd0cbfe';
    const initialization_vector1 = '253cb671289455a2';
    const cipher2 = 'e6476f2aa8c43a74d3f828e319b08710ddbc7de192e8e9bc07f8c079ee3d2597';
    const initialization_vector2 = 'e7a86a4ebb349660';
    const mockServer = new MockAdapter(axios);

    mockServer.onGet('http://localhost:3000/api/v1/secret_messages').reply(
      200,
      {'messages':
        [
          {'message':cipher1, 'initialization_vector':initialization_vector1},
          {'message':cipher2, 'initialization_vector':initialization_vector2}
      ]},
    );

    axios.get('http://localhost:3000/api/v1/secret_messages')
      .then((response) => {
        const httpClient = new HTTPClient();
        const decrypted = httpClient.decryptHTTP(response);
        expect(decrypted).toEqual([
          "There's always money in the banana stand.",
          "I've made a huge mistake."
        ]);
      });
  });
});
