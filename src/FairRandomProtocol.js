const SecureRandom = require('./SecureRandom');

class FairRandomProtocol {
  static async generate(range) {
    const key = SecureRandom.generateKey();
    const randomNumber = SecureRandom.generateRandomNumber(range);
    const hmac = SecureRandom.generateHMAC(key, randomNumber);

    console.log(`HMAC: ${hmac}`);
    const userNumber = await FairRandomProtocol.getUserInput(range);
    const result = (randomNumber + userNumber) % range;

    console.log(`My number is ${randomNumber} (KEY=${key}).`);
    return result;
  }

  static async getUserInput(range) {
    const prompt = require('prompt-sync')();
    let userNumber;
    do {
      console.log(`Add your number modulo ${range}.`);
      for (let i = 0; i < range; i++) {
        console.log(`${i} - ${i}`);
      }
      console.log('X - exit');
      userNumber = prompt('Your selection: ');
      if (userNumber === 'X') process.exit(0);
    } while (!/^[0-9]+$/.test(userNumber) || Number(userNumber) >= range);
    return Number(userNumber);
  }
}

module.exports = FairRandomProtocol;
