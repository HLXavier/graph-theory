const fs = require('fs')

const size = 18
const graph = JSON.parse(fs.readFileSync('../graphs/connected_components.json'))
const visited = Array(size).fill(false)
const components = {}
let count = 0

function connected_components() {
    for (let node = 0; node < size; node++) {
        if (!visited[node]) {
            count++
            components[count] = []
            dfs(node)
        }
    }
}

function dfs(current) {
    if (visited[current]) return 
    visited[current] = true

    components[count].push(current)

    for (node of graph[current]) {
        dfs(node)
    }
}

connected_components()
console.log(components)