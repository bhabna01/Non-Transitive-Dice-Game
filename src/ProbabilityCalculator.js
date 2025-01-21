class ProbabilityCalculator {
  static calculate(dice) {
    const probabilities = dice.map(() => Array(dice.length).fill(0));
    for (let i = 0; i < dice.length; i++) {
      for (let j = 0; j < dice.length; j++) {
        if (i === j) continue;
        probabilities[i][j] = ProbabilityCalculator.compareDice(dice[i], dice[j]);
      }
    }
    return probabilities;
  }

  static compareDice(diceA, diceB) {
    let winsA = 0, winsB = 0;
    for (const valueA of diceA.values) {
      for (const valueB of diceB.values) {
        if (valueA > valueB) winsA++;
        if (valueA < valueB) winsB++;
      }
    }
    return winsA / (winsA + winsB);
  }
}

module.exports = ProbabilityCalculator;
