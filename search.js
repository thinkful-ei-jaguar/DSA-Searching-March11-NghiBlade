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
 * Interview question:
 * Given a postorder traversal of a BST 8,12,10,16,25,20,15
 * construct the BST
 * Don't worry about runtime or other optimization for now
 *
 * input: [8,12,10,16,25,20,15]
 * output:  15
 *         /  \
 *        10  20
 *       /  \ / \
 *      8  12 16 25
 *
 * last item in the array is root
 * traverse from the end-1
 * compare each item to the root
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
