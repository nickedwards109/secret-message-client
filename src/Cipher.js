const crypto = require('crypto'),
      password = require('./secrets').password,
      algorithm = 'aes-256-cbc';

class Cipher {
  encrypt(text) {
    const cipher = crypto.createCipher(algorithm, password);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted
  }

  decrypt(text) {
    const decipher = crypto.createDecipher(algorithm, password);
    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}

export default Cipher;
