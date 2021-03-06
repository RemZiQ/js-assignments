
/** ******************************************************************************************
 *                                                                                          *
 * Plese read the following tutorial before implementing tasks:                             *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield        *
 *                                                                                          *
 ****************************************************************************************** */


/**
 * Returns the lines sequence of "99 Bottles of Beer" song:
 *
 *  '99 bottles of beer on the wall, 99 bottles of beer.'
 *  'Take one down and pass it around, 98 bottles of beer on the wall.'
 *  '98 bottles of beer on the wall, 98 bottles of beer.'
 *  'Take one down and pass it around, 97 bottles of beer on the wall.'
 *  ...
 *  '1 bottle of beer on the wall, 1 bottle of beer.'
 *  'Take one down and pass it around, no more bottles of beer on the wall.'
 *  'No more bottles of beer on the wall, no more bottles of beer.'
 *  'Go to the store and buy some more, 99 bottles of beer on the wall.'
 *
 * See the full text at
 * http://99-bottles-of-beer.net/lyrics.html
 *
 * NOTE: Please try to complete this task faster then original song finished:
 * https://www.youtube.com/watch?v=Z7bmyjxJuVY   :)
 *
 *
 * @return {Iterable.<string>}
 *
 */
function* get99BottlesOfBeer() {
  yield `99 bottles of beer on the wall, 99 bottles of beer.`;
  for (let i = 98; i > 1; i--){
    yield `Take one down and pass it around, ${i} bottles of beer on the wall.`;
    yield `${i} bottles of beer on the wall, ${i} bottles of beer.`;
  }
  yield `Take one down and pass it around, 1 bottle of beer on the wall.`;
  yield `1 bottle of beer on the wall, 1 bottle of beer.`;
  yield 'Take one down and pass it around, no more bottles of beer on the wall.'; //eslint-disable-line
  yield 'No more bottles of beer on the wall, no more bottles of beer.';
  yield 'Go to the store and buy some more, 99 bottles of beer on the wall.';
}


/**
 * Returns the Fibonacci sequence:
 *   0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, ...
 *
 * See more at: https://en.wikipedia.org/wiki/Fibonacci_number
 *
 * @return {Iterable.<number>}
 *
 */
function* getFibonacciSequence() {
  yield 0;
  yield 1;
  let a = 0;
  let b = 1;
  while(true){
    const c = a + b;
    a = b;
    b = c;
    yield c;
  }
}


/**
 * Traverses a tree using the depth-first strategy
 * See details: https://en.wikipedia.org/wiki/Depth-first_search
 *
 * Each node have child nodes in node.children array.
 * The leaf nodes do not have 'children' property.
 *
 * @params {object} root the tree root
 * @return {Iterable.<object>} the sequence of all tree nodes in depth-first order
 * @example
 *
 *   var node1 = { n:1 }, node2 = { n:2 }, node3 = { n:3 }, node4 = { n:4 },
 *       node5 = { n:5 }, node6 = { n:6 }, node7 = { n:7 }, node8 = { n:8 };
 *   node1.children = [ node2, node6, node7 ];
 *   node2.children = [ node3, node4 ];
 *   node4.children = [ node5 ];
 *   node7.children = [ node8 ];
 *
 *     source tree (root = 1):
 *            1
 *          / | \
 *         2  6  7
 *        / \     \            =>    { 1, 2, 3, 4, 5, 6, 7, 8 }
 *       3   4     8
 *           |
 *           5
 *
 *  depthTraversalTree(node1) => node1, node2, node3, node4, node5, node6, node7, node8
 *
 */
// function* depthTraversalTree(root) {
// function getNodes(obj){
//   for(let key in obj){
//     if(key === "n") stack.push({n: obj[key]});
//     if(key === "children"){
//       obj[key].forEach(elem => getNodes(elem));
//     }
//   }
// }
// getNodes(root);
// stack = stack.reverse();
// while(stack.length){
//   let n = stack.pop();
//   yield n;
// }
// }
function* depthTraversalTree(root) {
  let stack = [];

  function traversalTree(firstLevelElements) {
    const currRoots = [{children: firstLevelElements, i: 0}];
    while(currRoots.length) {
      const currRoot = currRoots[currRoots.length - 1];
      // will only be executed when top node is read, after that  remove top node from currRoots
      if(currRoot.i === currRoot.children.length) {
        currRoots.length--;
      } else {
        const item = currRoot.children[currRoot.i++];
        stack.push(item.n);  
        if(item.children){
          currRoots.push({children: item.children, i: 0});
        }
      }
    }
  }
  
  traversalTree([root]);
  stack = stack.reverse();

  while(stack.length){
    // didn`t push object to stack before, because in that decision tests runs faster
    const n = {n: stack.pop()};
    yield n;
  }
}


/**
 * Traverses a tree using the breadth-first strategy
 * See details: https://en.wikipedia.org/wiki/Breadth-first_search
 *
 * Each node have child nodes in node.children array.
 * The leaf nodes do not have 'children' property.
 *
 * @params {object} root the tree root
 * @return {Iterable.<object>} the sequence of all tree nodes in breadth-first order
 * @example
 *     source tree (root = 1):
 *
 *            1
 *          / | \
 *         2  3  4
 *        / \     \            =>    { 1, 2, 3, 4, 5, 6, 7, 8 }
 *       5   6     7
 *           |
 *           8
 *
 */
function* breadthTraversalTree(root) {
  const queue = [root];
  let i = 0;
  while(true){
    const currRoot = queue[i++];
    if(!currRoot) return null;
    if(currRoot.children){
      currRoot.children.forEach(elem => queue.push(elem));
    }
    const result = {n: currRoot.n};
    yield result;
  }
}


/**
 * Merges two yield-style sorted sequences into the one sorted sequence.
 * The result sequence consists of sorted items from source iterators.
 *
 * @params {Iterable.<number>} source1
 * @params {Iterable.<number>} source2
 * @return {Iterable.<number>} the merged sorted sequence
 *
 * @example
 *   [ 1, 3, 5, ... ], [2, 4, 6, ... ]  => [ 1, 2, 3, 4, 5, 6, ... ]
 *   [ 0 ], [ 2, 4, 6, ... ]  => [ 0, 2, 4, 6, ... ]
 *   [ 1, 3, 5, ... ], [ -1 ] => [ -1, 1, 3, 5, ...]
 */
function* mergeSortedSequences(source1, source2) {
  const gen1 = source1();
  const gen2 = source2();
  let current1 = gen1.next().value;
  let current2 = gen2.next().value;
  while(true){
    while(current1 < current2){
      yield current1;
      const helper = gen1.next().value;
      current1 = helper === undefined ? Infinity : helper;
    }
    while(current2 < current1){
      yield current2;
      const helper = gen2.next().value;
      current2 = helper === undefined ? Infinity : helper;
    }
  }
}

module.exports = {
  get99BottlesOfBeer: get99BottlesOfBeer,
  getFibonacciSequence: getFibonacciSequence,
  depthTraversalTree: depthTraversalTree,
  breadthTraversalTree: breadthTraversalTree,
  mergeSortedSequences: mergeSortedSequences
};
