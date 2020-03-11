const bst = require("./bst");
/**
 * #1
 * Given a sorted list 3, 5, 6, 8, 11, 12, 14, 15, 17, 18 and using the recursive binary search algorithm, identify the sequence of numbers that each recursive call will search to try and find
 *
 * Middles: 11, 5, 6, 8
 * 4 tries and found 8
 *
 * Middles: 11, 15, 17
 * 3 tries and can't find 16
 */

/**
 * #2 Linear and binary search
 * See Search directory
 */

/**
 * #3 Imagine you are looking for a book in a library with a Dewey Decimal index.
 * How would you go about it? Can you express this process as a search algorithm?
 * Implement your algorithm to find a book whose Dewey and book title is provided.
 *
 * Prefix (for categories): 0-1000
 * Decimal (location of the book): 500.1340938
 *
 * input: dewey: '005.133', title: 'The C++ Programming Language'
 * output:   {
    author: "Stroustrup., Bjarne",
    dewey: "005.133",
    title: "The C++ Programming Language"
  }
   
  Use recursive to create our BStree
  key = dewey
  value = array of book object

  Use input dewey to find our node - base case is node.key === dewey || node === null
  then check if value contains input title
  if so, return object
  if not, return "not found"
 */

const books = [
  { author: "Cowlishaw, Mike", dewey: "005.133", title: "The REXX Language" },
  { author: "Sams", dewey: "005.133", title: "Teach Yourself C++ In 21 Days" },
  {
    author: "Stroustrup., Bjarne",
    dewey: "005.133",
    title: "The C++ Programming Language"
  },
  {
    author: "Crockford, Douglas",
    dewey: "005.2762",
    title: "JavaScript: The Good Parts"
  },
  {
    author: "Flanagan, David",
    dewey: "005.2762",
    title: "JavaScript: The Definitive Guide"
  },
  {
    author: "Schmidt, Meinhard",
    dewey: "005.44684",
    title: "Windows Vista for Dummies"
  },
  { author: "Zondervan", dewey: "220.52081", title: "NIV Study Bible" },
  {
    author: "Humphries, Russell, Dr.",
    dewey: "231.7652",
    title: "Starlight and Time"
  },
  {
    author: "Jane, Frederick Thomas",
    dewey: "623.82509051",
    title: "Jane's Fighting Ships"
  },
  {
    author: "Norris, Chuck",
    dewey: "796.8092",
    title: "The Official Chuck Norris Fact Book"
  }
];

function createBST(arr, start = 0, end = arr.length - 1) {
  // base casre
  if (start > end) {
    return;
  }
  let index = Math.floor((end + start) / 2);
  let middle = arr[index];

  let library = new bst(middle.dewey, [
    middle.title.toLowerCase(),
    middle.author.toLowerCase()
  ]);
  library.left = createBST(arr, start, index - 1);
  library.right = createBST(arr, index + 1, end);
  return library;
}

function findBook(dewey, title) {
  const library = createBST(books);
  const result = library.dfs(dewey, title);
  if (result) return result[0];
  else return `${title} not found.`;
}

// console.log(findBook("005.44684", "Windows Vista for Dummies")); // returns object
// console.log(findBook("005.2762", "Hello World")); // returns false
// console.log(findBook("005.133", "The C++ Programming Language")); // duplicat should return the correct object

/**
 * Interview question:
 * Given a postorder traversal of a BST 8,12,10,16,25,20,15
 * construct the BST
 * Don't worry about runtime or other optimization for now
 *
 * input: [8,12,10,16,25,20,15]
 *              e         e
 * output:  15
 *         /  \
 *        10  20
 *       /  \ / \
 *      8  12 16 25
 *
 * last item in the array is root
 * traverse from the end-1
 * compare each item to the root - maybe only required if we don't know the pattern
 * add right children and then left
 */

function postOrderToBST(arr, start = 0, end = arr.length - 1) {
  // base case
  if (start > end) {
    return;
  }

  let bst = new BST(arr[end]);
  let i = 0;
  for (i = end; i >= start; i--) {
    if (arr[i] < bst.key) {
      break;
    }
  }
  bst.left = postOrderToBST(arr, start, i);
  bst.right = postOrderToBST(arr, i + 1, end);
  return bst;
}
