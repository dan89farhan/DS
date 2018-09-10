class Node {
  constructor(data) {
    this.left = null;
    this.right = null;
    this.data = data;
  }
}

class BinaryTree {
  constructor() {
    this.head = null;
  }
  add(data) {
    var newNode = new Node(data);
    if (this.head == null) {
      this.head = newNode;
    } else {
      this.addNode(this.head, newNode);
    }
  }

  addNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left == null) node.left = newNode;
      else this.addNode(node.left, newNode);
    } else {
      if (node.right == null) {
        node.right = newNode;
      } else {
        this.addNode(node.right, newNode);
      }
    }
  }

  inorder(node) {
    console.log("called ", node);

    if (node !== null) {
      this.inorder(node.left);
      console.log(node.data);
      this.inorder(node.right);
    }
  }
  gethead() {
    return this.head;
  }
}

var BT = new BinaryTree();
var head = BT.gethead();
BT.add(2);
BT.add(2);
BT.add(2);
BT.add(2);
BT.add(2);
BT.inorder(head);
console.log("from head", BT);
