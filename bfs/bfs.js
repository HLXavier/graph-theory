const fs = require('fs')

const size = 13
const graph = JSON.parse(fs.readFileSync('graphs/bfs.json'))
const queue = []
const prev = Array(size).fill(undefined)
const visited = Array(size).fill(false)

function bfs(starting_node) {
    queue.push(starting_node)

    visited[starting_node] = true

    while (queue.length > 0) {
        const current = queue.shift()

        for (node of graph[current]) {
            if (!visited[node]) {
                queue.push(node)
                visited[node] = true
                prev[node] = current
            }

        }
    }
}

function shortest_path(starting_node, ending_node) {
    const path = []

    for (let current = ending_node; current !== undefined; current = prev[current]) {
        path.push(current)
    }

    path.reverse()

    if (path[0] === starting_node) {
        return path
    }
    return []
}

const starting_node = 0
const ending_node = 1
bfs(starting_node)
const path = shortest_path(starting_node, ending_node)
console.log(path)
  
