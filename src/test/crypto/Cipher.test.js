import Cipher from '../../crypto/Cipher';

// !!! IMPORTANT !!!
// In order for these tests to work, you need to make a file src/secrets.js
//  with the following code:
//
// var crypto = require('crypto');
// var random_string = crypto.randomBytes(8).toString('hex');
// export const initialization_vector = Buffer.from(random_string);
//
// This sets up a random initialization vector that is used by default when a
//  Cipher is created without explicitly passing an IV into the constructor.

describe('Cipher', () => {
	it('encrypts and decrypts text', () => {
		const cipher = new Cipher();
		const data = 'a very secret string to encrypt';

		const encrypted = cipher.encrypt(data);
		expect(typeof encrypted).toEqual('string');
		expect(encrypted).not.toEqual(data);

		const decrypted = cipher.decrypt(encrypted);
		expect(typeof decrypted).toEqual('string');
		expect(decrypted).toEqual(data);
	});

	it('throws a TypeError if non-string data is passed into Cipher methods', () => {
		const cipher = new Cipher();

		const string_data = 'this is a string';
		expect( () => { cipher.encrypt(string_data) }).not.toThrow(new TypeError);

		const encrypted_data = cipher.encrypt(string_data);
		expect( () => { cipher.decrypt(encrypted_data) }).not.toThrow(new TypeError);
		expect( () => { cipher.decrypt(string_data)}).toThrow(new TypeError);

	  const number_data = 1337;
	  expect( () => { cipher.encrypt(number_data) }).toThrow(new TypeError);
	  expect( () => { cipher.decrypt(number_data) }).toThrow(new TypeError);

	  const object_data = { message: 'this is a message'};
	  expect( () => { cipher.encrypt(object_data) }).toThrow(new TypeError);
	  expect( () => { cipher.decrypt(object_data) }).toThrow(new TypeError);

	  const boolean_data = true;
	  expect( () => { cipher.encrypt(boolean_data) }).toThrow(new TypeError);
	  expect( () => { cipher.decrypt(boolean_data) }).toThrow(new TypeError);

	  const null_data = null;
	  expect( () => { cipher.encrypt(null_data) }).toThrow(new TypeError);
	  expect( () => { cipher.decrypt(null_data) }).toThrow(new TypeError);

	  const undefined_data = undefined;
	  expect( () => { cipher.encrypt(undefined_data) }).toThrow(new TypeError);
	  expect( () => { cipher.decrypt(undefined_data) }).toThrow(new TypeError);
	});
});
