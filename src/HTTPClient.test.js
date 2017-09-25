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
    const cipher1 = 'f749626e5faaf2a68baabe099ec2fc9925af37d02921edb324c477b57ae20d420ee57c2df6d334350b39cffc537d2544';
    const initialization_vector1 = '6a6bd9cd16b693dd';
    const cipher2 = 'b0f1581b9fc1e941aa13d8366d6509b0c1bc3ec4e01f9890eb42ed5b7c98391c'
    const initialization_vector2 = 'e3f4db4ebbf9e6c5'
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
