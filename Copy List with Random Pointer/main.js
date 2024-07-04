class Node {
    constructor(val = 0, next = null, random = null) {
        this.val = val;
        this.next = next;
        this.random = random;
    }
}

function copyRandomList(head) {
    if (!head) return null;
    const oldToNew = new Map();


    let current = head;
    while (current) {
        oldToNew.set(current, new Node(current.val));
        current = current.next;
    }

    current = head;
    while (current) {
        const newNode = oldToNew.get(current);
        newNode.next = current.next ? oldToNew.get(current.next) : null;
        newNode.random = current.random ? oldToNew.get(current.random) : null;
        current = current.next;
    }

    return oldToNew.get(head);
}

function createLinkedList(arr) {
    if (arr.length === 0) return null;

    const nodes = arr.map(([val, _]) => new Node(val));
    arr.forEach(([_, randomIndex], i) => {
        if (i < nodes.length - 1) {
            nodes[i].next = nodes[i + 1];
        }
        nodes[i].random = randomIndex !== null ? nodes[randomIndex] : null;
    });

    return nodes[0];
}


function printLinkedList(head) {
    const result = [];
    const nodeToIndex = new Map();
    let current = head;
    let index = 0;

    while (current) {
        nodeToIndex.set(current, index);
        result.push([current.val, null]);
        current = current.next;
        index++;
    }

    current = head;
    index = 0;
    while (current) {
        result[index][1] = current.random ? nodeToIndex.get(current.random) : null;
        current = current.next;
        index++;
    }

    console.log(result);
}
const input = [[7, null], [13, 0], [11, 4], [10, 2], [1, 0]];
const head = createLinkedList(input);
const copiedHead = copyRandomList(head);

printLinkedList(copiedHead); 
