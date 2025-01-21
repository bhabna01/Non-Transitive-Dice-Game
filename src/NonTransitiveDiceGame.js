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

    const userDice = await this.chooseUserDice();
    const computerDice = this.chooseComputerDice(userDice);

    console.log(`You selected dice: ${userDice.values.join(',')}`);
    console.log(`I selected dice: ${computerDice.values.join(',')}`);

    console.log("It's time for throws.");

    const userThrow = await this.throwDice(userDice);
    const computerThrow = await this.throwDice(computerDice);

    console.log(`Your throw: ${userThrow}. My throw: ${computerThrow}.`);

    if (userThrow > computerThrow) {
      console.log('You win!');
    } else if (userThrow < computerThrow) {
      console.log('I win!');
    } else {
      console.log("It's a draw!");
    }
  }

  async chooseUserDice() {
    const prompt = require('prompt-sync')();
    let selection;
    do {
      console.log('Choose your dice:');
      this.dice.forEach((d, i) => {
        console.log(`${i} - ${d.values.join(',')}`);
      });
      console.log('X - exit');
      console.log('? - help');

      selection = prompt('Your selection: ');
      if (selection === 'X') process.exit(0);
      if (selection === '?') HelpTable.display(this.dice, ProbabilityCalculator.calculate(this.dice));
    } while (!/^[0-9]+$/.test(selection) || Number(selection) >= this.dice.length);

    return this.dice[Number(selection)];
  }

  chooseComputerDice(userDice) {
    const remainingDice = this.dice.filter(d => d !== userDice);
    const randomIndex = Math.floor(Math.random() * remainingDice.length);
    return remainingDice[randomIndex];
  }

  async throwDice(dice) {
    const faceIndex = await FairRandomProtocol.generate(6);
    return dice.roll(faceIndex);
  }
}

module.exports = NonTransitiveDiceGame;
