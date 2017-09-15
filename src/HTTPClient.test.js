import HTTPClient from './HTTPClient';

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

  it('gets data from an API endpoint', () => {
    console.log('I have not yet figured out how to test the AJAX call.');
    console.log("To manually test this:");
    console.log("Run 'npm start'");
    console.log('Visit http://localhost:3000');
    console.log('Click on the button which prompts to get a message');
    console.log('Verify that data shows up in the browser.');
    console.log('Please, forgive me!');
  });
});
