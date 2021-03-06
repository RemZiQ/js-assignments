
/** ************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling  *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration              *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the 'Fizz','Buzz' or an original number using the following rules:
 * 1) return original number
 * 2) but if number multiples of three return 'Fizz'
 * 3) for the multiples of five return 'Buzz'
 * 4) for numbers which are multiples of both three and five return 'FizzBuzz'
 *
 * @param {number} num
 * @return {any}
 *
 * @example
 *   2 =>  2
 *   3 => 'Fizz'
 *   5 => 'Buzz'
 *   4 => 4
 *  15 => 'FizzBuzz'
 *  20 => 'Buzz'
 *  21 => 'Fizz'
 *
 */
function getFizzBuzz(num) {
  if(!(num % 15)) return `FizzBuzz`;
  if(!(num % 5)) return 'Buzz';
  if(!(num % 3)) return 'Fizz';
  return num;
}


/**
 * Returns the factorial of the specified integer n.
 *
 * @param {number} n
 * @return {number}
 *
 * @example:
 *   1  => 1
 *   5  => 120
 *   10 => 3628800
 */
function getFactorial(n) {
  let result = 1;
  for (let i = 1; i < n + 1; i += 1){
    result *= i; 
  }
  return result;
}


/**
 * Returns the sum of integer numbers between n1 and n2 (inclusive).
 *
 * @param {number} n1
 * @param {number} n2
 * @return {number}
 *
 * @example:
 *   1,2   =>  3  ( = 1+2 )
 *   5,10  =>  45 ( = 5+6+7+8+9+10 )
 *   -1,1  =>  0  ( = -1 + 0 + 1 )
 */
// sum of arithmetic progression
function getSumBetweenNumbers(n1, n2) {
  return (n1 + n2) / 2 * (n2 - n1 + 1);
}


/**
 * Returns true, if a triangle can be built with the specified sides a,b,c and false 
 * in any other ways.
 *
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {bool}
 *
 * @example:
 *   1,2,3    =>  false
 *   3,4,5    =>  true
 *   10,1,1   =>  false
 *   10,10,10 =>  true
 */
function isTriangle(a, b, c) {
  return a < b + c && b < a + c && c < b + a; 
}


/**
 * Returns true, if two specified axis-aligned rectangles overlap, otherwise false.
 * Each rectangle representing by object
 *  {
 *     top: 5,
 *     left: 5,
 *     width: 20,
 *     height: 10
 *  }
 *
 *  (5;5)
 *     -------------
 *     |           |
 *     |           |  height = 10
 *     -------------
 *        width=20
 *
 * NOTE: Please use canvas coordinate space (https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#The_grid),
 * it differs from Cartesian coordinate system.
 *
 * @param {object} rect1
 * @param {object} rect2
 * @return {bool}
 *
 * @example:
 *   { top: 0, left: 0, width: 10, height: 10 },
 *   { top: 5, left: 5, width: 20, height: 20 }    =>  true
 *
 *   { top: 0, left: 0, width: 10, height: 10 },
 *   { top:20, left:20, width: 20, height: 20 }    =>  false
 *
 */
function doRectanglesOverlap(rect1, rect2) {
  if(rect1.left > rect2.left + rect2.width ||
     rect2.left > rect1.left + rect1.width) return false;
  if(rect1.top + rect1.height < rect2.top ||
     rect2.top + rect2.height < rect1.top) return false;
  return true;
}


/**
 * Returns true, if point lies inside the circle, otherwise false.
 * Circle is an object of
 *  {
 *     center: {
 *       x: 5,
 *       y: 5
 *     },
 *     radius: 20
 *  }
 *
 * Point is object of
 *  {
 *     x: 5,
 *     y: 5
 *  }
 *
 * @param {object} circle
 * @param {object} point
 * @return {bool}
 *
 * @example:
 *   { center: { x:0, y:0 }, radius:10 },  { x:0, y:0 }     => true
 *   { center: { x:0, y:0 }, radius:10 },  { x:10, y:10 }   => false
 *
 */
function isInsideCircle(circle, point) {
  // eslint-disable-next-line
  return Math.hypot(circle.center.x - point.x, circle.center.y - point.y) < circle.radius; 
}


/**
 * Returns the first non repeated char in the specified strings otherwise returns null.
 *
 * @param {string} str
 * @return {string}
 *
 * @example:
 *   'The quick brown fox jumps over the lazy dog' => 'T'
 *   'abracadabra'  => 'c'
 *   'entente' => null
 */
function findFirstSingleChar(str) {
  for (let i = 0; i < str.length; i++) {
    const c = str.charAt(i);
    if (str.indexOf(c) === i && str.indexOf(c, i + 1) === -1) {
      return c;
    }
  } return null;
}


/**
 * Returns the string representation of math interval, specified by two points and 
 * include / exclude flags.
 * See the details: https://en.wikipedia.org/wiki/Interval_(mathematics)
 *
 * Please take attention, that the smaller number should be the first in the notation
 *
 * @param {number} a
 * @param {number} b
 * @param {bool} isStartIncluded
 * @param {bool} isEndIncluded
 * @return {string}
 *
 * @example
 *   0, 1, true, true   => '[0, 1]'
 *   0, 1, true, false  => '[0, 1)'
 *   0, 1, false, true  => '(0, 1]'
 *   0, 1, false, false => '(0, 1)'
 * Smaller number has to be first :
 *   5, 3, true, true   => '[3, 5]'
 *
 */
function getIntervalString(a, b, isStartIncluded, isEndIncluded) {
  const startBrackets = ['(', '['];
  const endBrackets = [')', ']'];
  const strArray = new Array(a, b).sort((a, b) => a - b)
    .join(',').replace(',', ', ');
  return startBrackets[+isStartIncluded] + strArray +
  endBrackets[+isEndIncluded];
}


/**
 * Reverse the specified string (put all chars in reverse order)
 *
 * @param {string} str
 * @return {string}
 *
 * @example:
 * 'The quick brown fox jumps over the lazy dog' => 'god yzal eht revo spmuj xof nworb kciuq ehT'
 * 'abracadabra' => 'arbadacarba'
 * 'rotator' => 'rotator'
 * 'noon' => 'noon'
 */
function reverseString(str) {
  return str.split('').reverse().join('');
}


/**
 * Reverse the specified integer number (put all digits in reverse order)
 *
 * @param {number} num
 * @return {number}
 *
 * @example:
 *   12345 => 54321
 *   1111  => 1111
 *   87354 => 45378
 *   34143 => 34143
 */
function reverseInteger(num) {
  return num.toString().split('').reverse().join('');
}


/**
 * Validates the CCN (credit card number) and return true if CCN is valid
 * and false otherwise.
 *
 * See algorithm here : https://en.wikipedia.org/wiki/Luhn_algorithm
 *
 * @param {number} cnn
 * @return {boolean}
 *
 * @example:
 *   79927398713      => true
 *   4012888888881881 => true
 *   5123456789012346 => true
 *   378282246310005  => true
 *   371449635398431  => true
 *
 *   4571234567890111 => false
 *   5436468789016589 => false
 *   4916123456789012 => false
 */
function isCreditCardNumber(ccn) {
  const cnnStr = ccn.toString();
  let result = 0;
  for(let i = 0; i < cnnStr.length; i += 1){
    let current = +cnnStr[i];
    if ((cnnStr.length - i) % 2 === 0) {
      current = current * 2;
      if (current > 9) {
        current = current - 9;
      }
    }
    result += current;
  }
  return result % 10 === 0;
}



/**
 * Returns the digital root of integer:
 *   step1 : find sum of all digits
 *   step2 : if sum > 9 then goto step1 otherwise return the sum
 *
 * @param {number} n
 * @return {number}
 *
 * @example:
 *   12345 ( 1+2+3+4+5 = 15, 1+5 = 6) => 6
 *   23456 ( 2+3+4+5+6 = 20, 2+0 = 2) => 2
 *   10000 ( 1+0+0+0+0 = 1 ) => 1
 *   165536 (1+6+5+5+3+6 = 26,  2+6 = 8) => 8
 */
function getDigitalRoot(num) {
  const result = num.toString().split('').reduce((a, b) => +a + +b);
  return result > 9 ? result.toString().split('').reduce((a, b) => +a + +b) : result;  //eslint-disable-line
}


/**
 * Returns true if the specified string has the balanced brackets and false otherwise.
 * Balanced means that is, whether it consists entirely of pairs of opening/closing brackets
 * (in that order), none of which mis-nest.
 * Brackets include [],(),{},<>
 *
 * @param {string} str
 * @return {boolean}
 *
 * @example:
 *   '' => true
 *   '[]'  => true
 *   '{}'  => true
 *   '()   => true
 *   '[[]' => false
 *   ']['  => false
 *   '[[][][[]]]' => true
 *   '[[][]][' => false
 *   '{)' = false
 *   '{[(<{[]}>)]}' = true
 */
function isBracketsBalanced(str) {
  let result = str;
  while ( result.match(/\{\}|\[\]|\(\)|<>/)){
    result = result.replace(/\{\}|\[\]|\(\)|<>/, '');
  }
  return result.length === 0;
}


/**
 * Returns the human readable string of time period specified by the start and end time.
 * The result string should be constrcuted using the folliwing rules:
 *
 * ---------------------------------------------------------------------
 *   Difference                 |  Result
 * ---------------------------------------------------------------------
 *    0 to 45 seconds           |  a few seconds ago
 *   45 to 90 seconds           |  a minute ago
 *   90 seconds to 45 minutes   |  2 minutes ago ... 45 minutes ago
 *   45 to 90 minutes           |  an hour ago
 *  90 minutes to 22 hours      |  2 hours ago ... 22 hours ago
 *  22 to 36 hours              |  a day ago
 *  36 hours to 25 days         |  2 days ago ... 25 days ago
 *  25 to 45 days               |  a month ago
 *  45 to 345 days              |  2 months ago ... 11 months ago
 *  345 to 545 days (1.5 years) |  a year ago
 *  546 days+                   |  2 years ago ... 20 years ago
 * ---------------------------------------------------------------------
 *
 * @param {Date} startDate
 * @param {Date} endDate
 * @return {string}
 *
 * @example
 *   Date('2000-01-01 01:00:00.100'), Date('2000-01-01 01:00:00.200')  => 'a few seconds ago'
 *   Date('2000-01-01 01:00:00.100'), Date('2000-01-01 01:00:05.000')  => '5 minutes ago'
 *   Date('2000-01-01 01:00:00.100'), Date('2000-01-02 03:00:05.000')  => 'a day ago'
 *   Date('2000-01-01 01:00:00.100'), Date('2015-01-02 03:00:05.000')  => '15 years ago'
 *
 */
// didn`t use new Data(delta * 1000).methods() becouse 
// test require millisecond accuracy
function timespanToHumanString(startDate, endDate) {
  const delta = (+endDate - +startDate) / 1000;

  // const will be named with rounding for conditions
  const minute = 45;
  const oneAndHalfOfMinute = 90;
  const twoMinutes = 120;
  const hour = 2700;
  const oneAndHalfOfHour = 5400;
  const twoHours = 7200;
  const day = 79200;
  const oneAndHalfOfDay = 129600; 
  const month = 2160000;
  const oneAndHalfOfMonth = 3888000;
  const twoMonths = 5184000;
  const year = 29808000;
  const oneAndHalfOfYear = 46656000;

  //const without rounding for calc readable string
  const exactlyMinute = 60;
  const exactlyHour = 3600;
  const exactlyDay = 86400;
  const exactlyMonth = 2592000;
  const exactlyYear = 31104000;
  
  switch(true) {
  case delta > oneAndHalfOfYear:
    return `${Math.round(delta / exactlyYear)} years ago`;

  case delta > year:
    return `a year ago`;

  case delta > twoMonths:
    return `${Math.round(delta / exactlyMonth)} months ago`;

  case delta > oneAndHalfOfMonth:
    return `2 months ago`;

  case delta > month:
    return `a month ago`;

  case delta > oneAndHalfOfDay:
    return `${Math.round((delta - 0.001) / exactlyDay)} days ago`;

  case delta > day:
    return `a day ago`;

  case delta > twoHours:
    return `${Math.round((delta - 0.001) / exactlyHour)} hours ago`;

  case delta > oneAndHalfOfHour:
    return `2 hours ago`;

  case delta > hour:
    return `an hour ago`;

  case delta > twoMinutes:
    return `${Math.floor(delta / exactlyMinute)} minutes ago`;

  case delta > oneAndHalfOfMinute:
    return `2 minutes ago`;

  case delta > minute:
    return `a minute ago`;

  default:
    return `a few seconds ago`; 
  }
}


/**
 * Returns the string with n-ary (binary, ternary, etc, where n<=10) representation of
 * specified number.
 * See more about
 * https://en.wikipedia.org/wiki/Binary_number
 * https://en.wikipedia.org/wiki/Ternary_numeral_system
 * https://en.wikipedia.org/wiki/Radix
 *
 * @param {number} num
 * @param {number} n, radix of the result
 * @return {string}
 *
 * @example:
 *   1024, 2  => '10000000000'
 *   6561, 3  => '100000000'
 *    365, 2  => '101101101'
 *    365, 3  => '111112'
 *    365, 4  => '11231'
 *    365, 10 => '365'
 */
function toNaryString(num, n) {
  return num.toString(n);
}


/**
 * Returns the commom directory path for specified array of full filenames.
 *
 * @param {array} pathes
 * @return {string}
 *
 * @example:
 *   ['/web/images/image1.png', '/web/images/image2.png']  => '/web/images/'
 *   ['/web/assets/style.css', '/web/scripts/app.js',  'home/setting.conf'] => ''
 *   ['/web/assets/style.css', '/.bin/mocha',  '/read.me'] => '/'
 *   ['/web/favicon.ico', '/web-scripts/dump', '/webalizer/logs'] => '/'
 */
function getCommonDirectoryPath(pathes) {
  // take array(of all paths) of arrays(for each path with '/' like separator)
  // sort array, because we need only the shortest path for algorithm 
  // [ '1/2/3/4', '1/2/3', '1,2,10,4'] => [[1, 2, 3], [1, 2, 3, 4], [1, 2, 10, 4]]
  const splitPath = pathes.map(elem => elem.split('/')).sort((a, b) => a - b);
  // take the shortest path and map() elemments to array(of each elemment of paths)
  // [ [1, 1, 1] [2, 2, 2] [3, 3, 10]]
  const neededPathes = splitPath[0].map((elem, index) => {
    const arr = [];
    splitPath.forEach(array => {
      arr.push(array[index]);
    });
    return arr;
  });
  // make sure that all arrays of array have the same element of paths
  // [ [1, 1, 1] [2, 2, 2] [3, 3, 10]] => [ [1, 1, 1] [2, 2, 2]]
  // get path with each first element of arrays of array with join '/'
  // [ [1, 1, 1] [2, 2, 2]] => ['1/', '2/']
  // return array.join()
  //[ '1/', '2/'] => '1/2/'
  // @pathes always begin from '/', thats why function always will return
  // '/path' or ''.
  return  neededPathes.filter( elem => elem.every( e => e === elem[0]))
    .map( elem => elem[0] + '/').join('');
}



/**
 * Returns the product of two specified matrixes.
 * See details: https://en.wikipedia.org/wiki/Matrix_multiplication
 *
 * @param {array} m1
 * @param {array} m2
 * @return {array}
 *
 * @example:
 *   [[ 1, 0, 0 ],       [[ 1, 2, 3 ],           [[ 1, 2, 3 ],
 *    [ 0, 1, 0 ],   X    [ 4, 5, 6 ],     =>     [ 4, 5, 6 ],
 *    [ 0, 0, 1 ]]        [ 7, 8, 9 ]]            [ 7, 8, 9 ]]
 *
 *                        [[ 4 ],
 *   [[ 1, 2, 3]]    X     [ 5 ],          =>     [[ 32 ]]
 *                         [ 6 ]]
 *
 */
function getMatrixProduct(m1, m2) {
  const rowsA = m1.length, colsA = m1[0].length,
    rowsB = m2.length, colsB = m2[0].length, result = [];
  if (colsA !== rowsB) return false;
  for (let i = 0; i < rowsA; i += 1) result[i] = [];
  for (let k = 0; k < colsB; k += 1){ 
    for (let m = 0; m < rowsA; m += 1){
      let t = 0;
      for (let j = 0; j < rowsB; j += 1) t += m1[m][j] * m2[j][k];
      result[m][k] = t;
    }
  } 
  return result;
}


/**
 * Returns the evaluation of the specified tic-tac-toe position.
 * See the details: https://en.wikipedia.org/wiki/Tic-tac-toe
 *
 * Position is provides as 3x3 array with the following values: 'X','0', undefined
 * Function should return who is winner in the current position according to the game rules.
 * The result can be: 'X','0',undefined
 *
 * @param {array} position
 * @return {string}
 *
 * @example
 *
 *   [[ 'X',   ,'0' ],
 *    [    ,'X','0' ],       =>  'X'
 *    [    ,   ,'X' ]]
 *
 *   [[ '0','0','0' ],
 *    [    ,'X',    ],       =>  '0'
 *    [ 'X',   ,'X' ]]
 *
 *   [[ '0','X','0' ],
 *    [    ,'X',    ],       =>  undefined
 *    [ 'X','0','X' ]]
 *
 *   [[    ,   ,    ],
 *    [    ,   ,    ],       =>  undefined
 *    [    ,   ,    ]]
 *
 */
function evaluateTicTacToePosition(position) {

  // check rows
  const len = position.length;
  for (let i = 0; i < len; i += 1){
    if(position[i].length === len && !position[i].includes() && 
      position[i].every((elem, index, arr ) => arr[0] === elem )){
      return position[i][0];
    }
  }

  // check column
  for (let i = 0; i < len; i += 1){
    const currentColumn = position.map(elem => elem[i]);
    if(currentColumn.length === len && !currentColumn.includes() &&
      currentColumn.every((elem, index, arr ) => arr[0] === elem )){
      return currentColumn[0];
    }
  }

  // check diagonals
  // always will have only 2 diagonals
  let counter = 0;
  let secondCounter = len - 1;
  const diagonals = [];
  diagonals.push(position.map(elem => elem[counter++]));
  diagonals.push(position.map(elem => elem[secondCounter--]));

  for(let i = 0; i < 2; i += 1){
    if(diagonals[i].length === len && !diagonals[i].includes() &&
    diagonals[i].every((elem, index, arr ) => arr[0] === elem )){
      return diagonals[i][0];
    }
  }
}

module.exports = {
  getFizzBuzz: getFizzBuzz,
  getFactorial: getFactorial,
  getSumBetweenNumbers: getSumBetweenNumbers,
  isTriangle: isTriangle,
  doRectanglesOverlap: doRectanglesOverlap,
  isInsideCircle: isInsideCircle,
  findFirstSingleChar: findFirstSingleChar,
  getIntervalString : getIntervalString,
  reverseString: reverseString,
  reverseInteger: reverseInteger,
  isCreditCardNumber: isCreditCardNumber,
  getDigitalRoot: getDigitalRoot,
  isBracketsBalanced: isBracketsBalanced,
  timespanToHumanString : timespanToHumanString,
  toNaryString: toNaryString,
  getCommonDirectoryPath: getCommonDirectoryPath,
  getMatrixProduct: getMatrixProduct,
  evaluateTicTacToePosition : evaluateTicTacToePosition
};