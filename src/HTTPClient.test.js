import HTTPClient from './HTTPClient';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

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
      {'message':cipher, 'initialization_vector':initialization_vector},
    )

    axios.get('http://localhost:3000/api/v1/secret_messages/1')
      .then((response) => {
        const httpClient = new HTTPClient();
        const decrypted = httpClient.decryptHTTP(response);
        expect(decrypted).toEqual("There's always money in the banana stand.");
      });
  });
});
