const DiceParser = require('./src/DiceParser');
const NonTransitiveDiceGame = require('./src/NonTransitiveDiceGame');

try {
  const dice = DiceParser.parse(process.argv.slice(2));
  const game = new NonTransitiveDiceGame(dice);
  game.play();
} catch (error) {
  console.error(error.message);
  console.log('Usage: node index.js <dice1> <dice2> <dice3> [...diceN]');
  console.log('Each dice must be a string of 6 comma-separated integers.');
}
