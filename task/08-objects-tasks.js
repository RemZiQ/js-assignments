
/** ************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectagle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    var r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  Rectangle.prototype.getArea = (() => this.width * this.height);
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    var r = fromJSON(Rectangle.prototype, '{"width":10, "height":20}');
 *
 */
function fromJSON(proto, json) {
  return Object.assign(Object.create(proto), JSON.parse(json));
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class and
 * pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurences
 *
 * All types of selectors can be combined using the combinators ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy and
 * implement the functionality
 * to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string repsentation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple, clear
 * and readable as possible.
 *
 * @example
 *
 *  var builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify() =>
 *    '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify() =>
 *    'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify() =>
 *      'div#main.container.draggable + table#data ~ tr:nth-of-type(even) td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

// In this case we need chain. Thats why in every method 
// we will return new object with link to classMethods.
// Because ours chain not always ends with specific method 
// we need to return current result when chain was end.
// Will be used object what returns from method for saving current result.
// For performance requirements will create ordered array(by user input) of selectors wich will
// saved in object what returns from method.
const cssSelectorBuilder = {
  storage: {
    firstExeption: 'Element, id and pseudo-element should' +
      ' not occur more then one time inside the selector',
    secondExeption: 'Selector parts should be arranged' +
      ' in the following order:' +
      ' element, id, class, attribute, pseudo-class, pseudo-element'
  },
  element(value) {
    let currentResult = '';
    const currentOrder = [];

    if(this.hasOwnProperty('result')){
      currentResult = this.result;
    }
    currentResult += `${value}`;

    if(this.hasOwnProperty('order')){
      currentOrder.push(...this.order);
    }
    currentOrder.push('element');
    this.checkRepeatElement(currentOrder);
    this.checkOrder(currentOrder);
    
    const chain = {
      result: currentResult,
      order: currentOrder
    };
    chain.__proto__ = this;
    return chain;
  },
  id(value) {
    let currentResult = '';
    const currentOrder = [];

    if(this.hasOwnProperty('result')){
      currentResult = this.result;
    }
    currentResult += `#${value}`;

    if(this.hasOwnProperty('order')){
      currentOrder.push(...this.order);
    }
    currentOrder.push('id');
    this.checkRepeatID(currentOrder);
    this.checkOrder(currentOrder);

    const chain = {
      result: currentResult,
      order: currentOrder
    };
    chain.__proto__ = this;
    return chain;
  },
  class(value) {
    let currentResult = '';
    const currentOrder = [];

    if(this.hasOwnProperty('result')){
      currentResult = this.result;
    }
    currentResult += `.${value}`;

    if(this.hasOwnProperty('order')){
      currentOrder.push(...this.order);
    }
    currentOrder.push('class');
    this.checkOrder(currentOrder);

    const chain = {
      result: currentResult,
      order: currentOrder
    };
    chain.__proto__ = this;
    return chain;
  },
  attr(value) {
    let currentResult = '';
    const currentOrder = [];

    if(this.hasOwnProperty('result')){
      currentResult = this.result;
    }

    if(this.hasOwnProperty('order')){
      currentOrder.push(...this.order);
    }
    currentOrder.push('attr');
    this.checkOrder(currentOrder);

    currentResult += `[${value}]`;
    const chain = {
      result: currentResult,
      order: currentOrder
    };
    chain.__proto__ = this;
    return chain;
  },
  pseudoClass(value) {
    let currentResult = '';
    const currentOrder = [];

    if(this.hasOwnProperty('result')){
      currentResult = this.result;
    }
    currentResult += `:${value}`;

    if(this.hasOwnProperty('order')){
      currentOrder.push(...this.order);
    }
    currentOrder.push('pseudoClass');
    this.checkOrder(currentOrder);

    const chain = {
      result: currentResult,
      order: currentOrder
    };
    chain.__proto__ = this;
    return chain;
  },
  pseudoElement(value) {
    let currentResult = '';
    const currentOrder = [];

    if(this.hasOwnProperty('result')){
      currentResult = this.result;
    }
    currentResult += `::${value}`;

    if(this.hasOwnProperty('order')){
      currentOrder.push(...this.order);
    }
    currentOrder.push('pseudoElement');
    this.checkRepeatPseudoElement(currentOrder);
    this.checkOrder(currentOrder);

    const chain = {
      result: currentResult,
      order: currentOrder
    };
    chain.__proto__ = this;
    return chain;
  },
  combine(selector1, combinator, selector2){
    const chain = {
      result: `${selector1.result} ${combinator} ${selector2.result}`
    };
    chain.__proto__ = this;
    return chain;
  },
  stringify(){
    return this.result;
  },
  checkRepeatElement(arr){
    if(arr.filter(elem => elem === 'element').length > 1){
      throw new Error(this.storage.firstExeption);
    }
  },
  checkRepeatID(arr){
    if(arr.filter(elem => elem === 'id').length > 1){
      throw new Error(this.storage.firstExeption);
    }
  },
  checkRepeatPseudoElement(arr){
    if(arr.filter(elem => elem === 'pseudoElement').length > 1){
      throw new Error(this.storage.firstExeption);
    }
  },
  checkOrder(arr){
    const map = ['element', 'id', 'class', 'attr', 'pseudoClass', 'pseudoElement']; //eslint-disable-line
    const checker = arr.map(elem => map.indexOf(elem));
    if(checker[checker.length - 1] < checker[checker.length - 2]){
      throw new Error(this.storage.secondExeption);
    }
  }
};

module.exports = {
  Rectangle: Rectangle,
  getJSON: getJSON,
  fromJSON: fromJSON,
  cssSelectorBuilder: cssSelectorBuilder
};
