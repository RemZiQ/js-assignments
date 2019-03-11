/**
 * Takes two strings including only letters from a to z.
 * Returns a new sorted string containing distinct letters.
 *
 * @param {string} value1
 * @param {string} value2
 * @return {string}
 *
 * @example
 *   'azy', 'bk' => 'abkyz'
 *   'zxxlal','laxk'    => 'aklxz'
 *   'abcdefghijklmnop',  'lmnopqrstuvwxyz'  => 'abcdefghijklmnopqrstuvwxyz'
 */
function distinctLettersString(value1, value2) {
  const arr = (value1 + value2)
    .split('').sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));
  const result = arr.filter((elem, index) =>
    arr.indexOf(elem) === index).join('');
  return result;
}


/**
 * Takes a string with any characters.
 * Returns an object containing appearence of every distinct letters in lower case.
 *
 * @param {string} value
 * @return {Object}
 *
 * @example
 *  'Who you are, Buddy?' => { a:1, d:2, e:1, h:1, o:2, r:1, u:2, y:2 }
 *
 */

function lowerLetters(value) {
  const arr = value.split('').filter(elem => 
    elem.charCodeAt(0) >= 97 && elem.charCodeAt(0) <= 122)
    .sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0));
  const result = arr.reduce((acc, elem) => {
    acc[elem] = (acc[elem] || 0) + 1;
    return acc;
  }, {});
  return result;
}

/**
 * Write a function that will convert a string into title case, given an optional
 * list of exception (minor words). The list of minor words will be given as a
 * string with each word separated by a space. Your function should ignore the
 * case of the minor words string - it should behave in the same way even if the
 * case of the minor word is changed
 *
 * @param {string} the original string to be converted
 * @param {string} list of minor words that must always be lowercase except for
 *                  the first word in the string
 * @return {string}
 *
 * @example
 * //must be update 'a clash if KINGS' to 'a clash of KINGS'
 *    'a clash if KINGS', 'a an the of'  =>  'A Clash of Kings'
 *    'THE WIND IN THE WILLOWS', 'The In'  => 'The Wind in the Willows'
 *    'the quick brown fox'  => 'The Quick Brown Fox'
 */

function titleCaseConvert(title, minorWords) {
  const arr = title.toLowerCase().split(' ');
  const exeption = minorWords ? minorWords.toLowerCase().split(' ') : [];
  const resultArray = arr.map(elem => {
    if(exeption.some(exeptionElem => exeptionElem === elem)){
      return elem;
    }
    return elem[0].toUpperCase().concat(elem.slice(1));
  });
  const result = resultArray.join(' ');
  return result[0].toUpperCase().concat(result.slice(1));
}

/**
 * Your job is to create a calculator which evaluates expressions in Reverse Polish
 * notation (https://en.wikipedia.org/wiki/Reverse_Polish_notation). Empty expression
 * should evaluate to 0. Expression without operation returns the last number.
 *
 * @param {string} RPN string, each number and operation separated by a space
 *
 * @return {Number}
 *
 * @example
 *  ''  =>  0  // empty expression returns 0
 *  '1 2 3'  =>  3  // expression without operation returns the last number
 *  '4 2 +'  =>  6  // 4 + 2
 *  '2 5 * 2 + 3 /'  =>  4   //  ((5 * 2) + 2) / 3
 *  '5 1 2 + 4 * + 3 -'  =>  14   // 5 + ((1 + 2) * 4) -3
 */

function calcRPN(expr) {
  if(expr.length === 0) return 0;

  const arr = expr.split(' ').map(elem => {
    if(isFinite(elem)) return +elem;
    return elem;
  });
  const checker = arr.indexOf('+') === -1 &&
    arr.indexOf('-') === -1 &&
    arr.indexOf('*') === -1 &&
    arr.indexOf('/') === -1;

  if(checker) return arr[arr.length - 1];

  const stack = [];
  const map = ['+', '-', '*', '/'];
  const add = (a, b) => b + a;
  const sub = (a, b) => b - a;
  const multi = (a, b) => b * a;
  const division = (a, b) => b / a;
  const functionMap = [add, sub, multi, division];
  for(let i = 0; i < arr.length; i += 1){
    if(isFinite(arr[i])) stack.push(arr[i]);
    if(!isFinite(arr[i])){
      stack.push(functionMap[map.indexOf(arr[i])](stack.pop(), stack.pop()));
    }
  }
  return stack[0];
}

module.exports = {
  distinctLettersString,
  lowerLetters,
  titleCaseConvert,
  calcRPN
};