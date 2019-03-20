module.exports = function check(str, bracketsConfig) {
  "use strict";

  let stack = [];
  let balance = true;

  function opnClsBracketsSame(curr, pair) {
    if (bracketsConfig[pair][0] === curr && bracketsConfig[pair][1] === curr) {
      return true;
    }
  }

  function rowsRatio(a, b) {
    return a.length / b.length;
  }

  function stackLast() {
    return stack[stack.length - 1];
  }

  for (let i = 0; i < str.length; i++) {
    const curr = str[i];

    for (let j = 0; j < bracketsConfig.length; j++) {
      if (opnClsBracketsSame(curr, j)) {
        if (stackLast() === curr) {
          stack.pop();

          break;
        }

        if (stackLast() !== curr) {
          stack.push(bracketsConfig[j][1]);

          if (rowsRatio(str, stack) < 2) {
            balance = false;
          }

          break;
        }
      }

      if (bracketsConfig[j][0] === curr) {
        stack.push(bracketsConfig[j][1]);

        if (rowsRatio(str, stack) < 2) {
          balance = false;
        }

        break;
      }

      if (bracketsConfig[j][1] === curr) {
        const prev = stack.pop();

        if (bracketsConfig[j][1] !== prev) {
          balance = false;
        }

        break;
      }
    }

    if (!balance) {
      return balance;
    }
  }

  if (stack.length !== 0) {
    balance = false;
  }

  return balance;
};
