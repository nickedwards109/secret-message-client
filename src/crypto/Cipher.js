const crypto = require('crypto'),
      algorithm = 'aes-256-cbc';

class Cipher {
  constructor(key, initialization_vector) {
    this.key = key;
    this.initialization_vector = initialization_vector;
  }

  encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, this.key, this.initialization_vector);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted
  }

  decrypt(text) {
    const decipher = crypto.createDecipheriv(algorithm, this.key, this.initialization_vector);
    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}

export default Cipher;
