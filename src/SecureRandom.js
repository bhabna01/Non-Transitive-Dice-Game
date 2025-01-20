const crypto = require('crypto');

class SecureRandom {
  static generateKey() {
    return crypto.randomBytes(32).toString('hex');
  }

  static generateRandomNumber(range) {
    let number;
    do {
      number = parseInt(crypto.randomBytes(4).toString('hex'), 16);
    } while (number >= Math.floor(0xFFFFFFFF / range) * range);
    return number % range;
  }

  static generateHMAC(key, message) {
    return crypto.createHmac('sha3-256', key).update(message.toString()).digest('hex');
  }
}

module.exports = SecureRandom;
