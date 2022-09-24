const fs = require('fs')

const tree = JSON.parse(fs.readFileSync('trees/tree.json'))
const binTree = Array(9).fill(0)

function leafSum(node) {
    if (isLeaf(node)) {
        return node
    }

    let total = 0
    for (const next of tree[node]) {
        total += leafSum(next)
    }
    return total
}

function isLeaf(node) {
    return tree[node].length === 0
}

console.log(leafSum(5))

function height(node) {
    if (binTree[node] === undefined) {
        return -1
    }

    return Math.max(height(node * 2 + 1), height(node * 2 + 2)) + 1
}

console.log(height(0))

