import Hmac from './HMAC';

describe('hmac', () => {
  it('generates a hash from data and a key', () => {
    const hmac = new Hmac();
    const key = '56a608dd0976a0e4727e6be306dcfe20fbb8f9017ae34ad82ae338a701b53ddde73a7ab2daf08ef54d375160996c3fb4bf5eab21d73a8eeb9246f93195598cc7';
    const data = 'this is some string data';
    const hash = hmac.hash(data, key);
    const expected_hash = '547167367d838790107de41e4c443837703192f92cbc98af64989ddbf5e88eca';

    expect(typeof hash).toEqual('string');
    expect(hash).toEqual(expected_hash);
  })
});
