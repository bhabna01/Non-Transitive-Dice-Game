const Table = require('cli-table3');

class HelpTable {
  static display(dice, probabilities) {
    const table = new Table({
      head: ['User dice vs.'].concat(dice.map(d => d.values.join(','))),
      style: { head: ['cyan'] },
    });

    dice.forEach((_, i) => {
      const row = [dice[i].values.join(',')];
      dice.forEach((_, j) => {
        row.push(i === j ? '-' : probabilities[i][j].toFixed(4));
      });
      table.push(row);
    });

    console.log('Probability of the win for the user:');
    console.log(table.toString());
  }
}

module.exports = HelpTable;
