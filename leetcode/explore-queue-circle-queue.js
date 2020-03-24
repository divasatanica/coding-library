/**
 * Initialize your data structure here. Set the size of the queue to be k.
 * @param {number} k
 */
var MyCircularQueue = function(k) {
    this._size = k;
    this._front = this._rear = -1;
    this._space = Array.from({ length: k }).map(() => null);
}

/**
 * Insert an element into the circular queue. Return true if the operation is successful. 
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function(value) {
    if (this.isFull()) {
        return false;
    }
    if (this.isEmpty()) {
        this._front = 0;
    }
    this._rear = (this._rear + 1) % this._size;
    this._space[this._rear] = value;
    return true;
};

/**
 * Delete an element from the circular queue. Return true if the operation is successful.
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function() {
    if (this.isEmpty()) {
        return false;
    }
    if (this._front === this._rear) {
        this._front = -1;
        this._rear = -1;
        return true;
    }

    this._space[this._front] = null;
    this._front = (this._front + 1) % this._size;
    return true;
};

/**
 * Get the front item from the queue.
 * @return {number}
 */
MyCircularQueue.prototype.Front = function() {
    if (this.isEmpty()) {
        return -1;
    }
    return this._space[this._front];
};

/**
 * Get the last item from the queue.
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function() {
    if (this.isEmpty()) {
        return -1;
    }
    return this._space[this._rear];
};

/**
 * Checks whether the circular queue is empty or not.
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function() {
    return this._front === -1;
};

/**
 * Checks whether the circular queue is full or not.
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function() {
    return (this._rear + 1) % this._size === this._front;
};

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */

var obj = new MyCircularQueue(3)
console.log(obj.enQueue(1))
console.log(obj.enQueue(2))
console.log(obj.enQueue(3))
console.log(obj.enQueue(4))
console.log(obj.Rear())
console.log(obj.isFull())
console.log(obj.deQueue())
console.log(obj.enQueue(4))
console.log(obj.Rear())
// console.log(obj.Front())
// console.log(obj.Rear())
// console.log(obj.isEmpty())
// console.log(obj.isFull())