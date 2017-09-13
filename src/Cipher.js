const crypto = require('crypto'),
      algorithm = 'aes-256-cbc';

class Cipher {
  constructor(password = require('./secrets').password) {
    this.password = password;
  }

  encrypt(text) {
    const cipher = crypto.createCipher(algorithm, this.password);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted
  }

  decrypt(text) {
    const decipher = crypto.createDecipher(algorithm, this.password);
    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}

export default Cipher;
