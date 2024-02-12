/** Node: node for a singly linked list. */
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */
class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  _get(idx) {
    // Check if the index is valid
    if (idx < 0 || idx >= this.length) {
      throw new Error('Invalid Index');
    }

    let currentNode = this.head;
    let count = 0;

    // Traverse the linked list until reaching the node at the specified index
    while (currentNode !== null && count != idx) {
      currentNode = currentNode.next;
      count++;
    }

    return currentNode;
  }

  /** push(val): add new value to end of list. */
  push(val) {
    const newNode = new Node(val);

    if (!this.head) {
      // If list is empty, append a new node w/ value 'val' to end of linked list
      this.head = newNode;
      this.tail = newNode;
    } else {
      // Update the 'next' pointer of the current tail to the new node along with the 'tail pointer
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  /** unshift(val): add new value to start of list. */
  unshift(val) {
    const newNode = new Node(val);

    if (this.head === null) {
      // Add a new node with the value 'val' to the beginning of the list
      this.head = newNode;
      this.tail = newNode
    } else {
      //
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
  }

  /** pop(): return & remove last item. */
  pop() {
    // Check if list is empty
    if (!this.tail) {
      throw new Error('List is empty!');
    }

    // Remove and return last item
    return this.removeAt(this.length - 1);
  }

  /** shift(): return & remove first item. */
  shift() {
    if (this.length === 0) {
      throw new Error('Cannot shift from an empty list');
    }
    return this.removeAt(0);
  }

  /** getAt(idx): get val at idx. */
  getAt(idx) {
    if (idx < 0 || idx >= this.length) {
      throw new Error('Invalid Index');
    }
    return this._get(idx).val;
  }

  /** setAt(idx, val): set val at idx to val */
  setAt(idx, val) {
    if (idx < 0 || idx >= this.length) {
      throw new Error('Invalid Index');
    }

    let currentNode = this._get(idx);
    currentNode.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */
  insertAt(idx, val) {
    // Insert at the beginning of the list or the end
    if (idx === 0) {
      this.unshift(val);
      return;
    }

    // Insert at the end of the list
    if (idx === this.length) {
      this.push(val);
    }

    // Check if idx is valid for insertion in the middle of the list
    if (idx < 0 || idx > this.length) {
      throw new Error('Invalid Index');
    }

    // Insert in the middle of the list
    let prevNode = this._get(idx - 1);
    let newNode = new Node(val);

    newNode.next = prevNode.next;
    prevNode.next = newNode;

    this.length++;
  }

  /** removeAt(idx): return & remove item at idx, */
  removeAt(idx) {
    if (idx < 0 || idx >= this.length) {
      throw new Error('Invalid Index');
    }

    let val;
    let prevNode;

    // Edge case: Remove head from list
    if (idx === 0) {
      val = this.head.val;
      this.head = this.head.next;
      this.length--;
      if (this.length === 0) {
        this.tail = null;
      }
      return val;
    }

    let currentNode = this._get(idx - 1);

    // Remove node in the middle
    if (idx !== this.length - 1) {
      val = currentNode.next.val;
      currentNode.next = currentNode.next.next;
      this.length--;
      return val;
    }

    // Edge case: Remove tail from list
    if (idx === this.length - 1) {
      val = this.tail.val;
      prevNode = this._get(this.length - 2);
      prevNode.next = null
      this.tail = prevNode;
      this.length--;
      return val;
    }
  }

  /** average(): return an average of all values in the list */
  average() {
    if (this.length === 0) return 0;

    let sum = 0;
    let currentNode = this.head;

    while (currentNode) {
      sum += currentNode.val;
      currentNode = currentNode.next;
    }
    return sum / this.length;
  }
}

module.exports = LinkedList;
