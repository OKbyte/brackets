module.exports = function check(str, bracketsConfig) {
  "use strict";

  let stack = [];
  let balance = true;
  let prev;

  function pairedBraketsSame(bracket, pair) {
    if (
      bracketsConfig[pair][0] === bracket &&
      bracketsConfig[pair][1] === bracket
    ) {
      return true;
    }
  }

  function stackLast() {
    return stack[stack.length - 1];
  }

  function foo(bracket) {
    for (let j = 0; j < bracketsConfig.length; j++) {
      if (pairedBraketsSame(bracket, j)) {
        if (stackLast() === bracket) {
          stack.pop();

          break;
        }

        if (stackLast() !== bracket) {
          stack.push(bracketsConfig[j][1]);

          break;
        }
      }

      if (bracketsConfig[j][0] === bracket) {
        stack.push(bracketsConfig[j][1]);

        break;
      }

      if (bracketsConfig[j][1] === bracket) {
        prev = stack.pop();

        if (prev !== bracketsConfig[j][1]) balance = false;

        break;
      }
    }
  }

  for (let i = 0; i < str.length; i++) {
    foo(str[i]);
  }

  if (stack.length !== 0) balance = false;

  return balance;
};
