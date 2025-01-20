const HelpTable = require('./HelpTable');
const ProbabilityCalculator = require('./ProbabilityCalculator');
const FairRandomProtocol = require('./FairRandomProtocol');

class NonTransitiveDiceGame {
  constructor(dice) {
    this.dice = dice;
  }

  async play() {
    console.log("Let's determine who makes the first move.");
    const firstMove = await FairRandomProtocol.generate(2);

    const userFirst = firstMove === 1;
    console.log(userFirst ? 'You make the first move!' : 'I make the first move!');

    const firstPlayerDice = await this.chooseDice(userFirst);
    const secondPlayerDice = await this.chooseDice(!userFirst, firstPlayerDice);

    console.log("It's time for throws.");

    const firstThrow = await this.throwDice(firstPlayerDice);
    const secondThrow = await this.throwDice(secondPlayerDice);

    console.log(`Your throw: ${firstThrow}. My throw: ${secondThrow}.`);

    if (firstThrow > secondThrow) {
      console.log('You win!');
    } else if (firstThrow < secondThrow) {
      console.log('I win!');
    } else {
      console.log('It\'s a draw!');
    }
  }

  async chooseDice(isUser, excludedDice) {
    const prompt = require('prompt-sync')();
    let selection;
    do {
      console.log('Choose your dice:');
      this.dice.forEach((d, i) => {
        if (d !== excludedDice) {
          console.log(`${i} - ${d.values.join(',')}`);
        }
      });
      console.log('X - exit');
      console.log('? - help');

      selection = prompt('Your selection: ');
      if (selection === 'X') process.exit(0);
      if (selection === '?') HelpTable.display(this.dice, ProbabilityCalculator.calculate(this.dice));
    } while (!/^[0-9]+$/.test(selection) || Number(selection) >= this.dice.length || this.dice[Number(selection)] === excludedDice);

    return this.dice[Number(selection)];
  }

  async throwDice(dice) {
    const faceIndex = await FairRandomProtocol.generate(6);
    return dice.roll(faceIndex);
  }
}

module.exports = NonTransitiveDiceGame;
