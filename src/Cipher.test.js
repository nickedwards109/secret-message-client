import Cipher from './Cipher';

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
});
