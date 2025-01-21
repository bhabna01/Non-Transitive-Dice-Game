class Dice {
  constructor(values) {
    if (values.length !== 6 || !values.every(Number.isInteger)) {
      throw new Error('Each dice must have exactly 6 integers.');
    }
    this.values = values;
  }

  roll(faceIndex) {
    return this.values[faceIndex];
  }
}

module.exports = Dice;
