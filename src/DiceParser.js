const Dice = require('./Dice');

class DiceParser {
  static parse(args) {
    if (args.length < 3) {
      throw new Error('You must specify at least 3 dice configurations.');
    }
    return args.map(arg => new Dice(arg.split(",").map(Number)));
  }
}

module.exports = DiceParser;
