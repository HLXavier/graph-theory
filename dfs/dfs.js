const fs = require('fs')

const size = 13
const graph = JSON.parse(fs.readFileSync('../graphs/dfs.json'))
const visited = Array(size).fill(false)
const nodes = []

function dfs(current) {
    if (visited[current]) return 
    visited[current] = true
    nodes.push(current)

    for (node of graph[current]) {
        dfs(node)
    }
}

function _dfs(current) {
    visited[current] = true
    nodes.push(current)

    for (node of graph[current]) {
        if (!visited[node]) {
            _dfs(node)
        }
    }
}

const starting_node = 0
dfs(starting_node)
console.log(nodes)

