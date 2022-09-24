const fs = require('fs')

const graph = JSON.parse(fs.readFileSync('./graphs/prim.json'))
const costs = Array(6).fill(Infinity)
const visited = Array(6).fill(false)
const tree = []

// 0 will be the starting node
current = 0
costs[current] = 0

// complexity depends on priority queue implementation
function prim() {
    // number of edges in a tree = vertexes - 1
    while (tree.length > 5) {
        const min = Infinity
        for (const edge of graph[current]) {
            if (!visited[edge.node] && costs[edge.node] > edge.weight) {
                costs[edge.node] = edge.weight
            }
        }

        for (let i = 0; i < 6; i++) {
            if (!visited[i] && ) {

            }
        }
    }
}

prim()