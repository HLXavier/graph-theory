const fs = require('fs')

const graph = JSON.parse(fs.readFileSync('../graphs/tarjan.json'))
const stack = []
const ids = {}
const low = {}

let id = 0
let sccCount = 0

function tarjan() {
    for (const node of Object.keys(graph)) {
        if (ids[node] === undefined) {
            dfs(node)
        }
    }
}

function dfs(current) {
    stack.push(current)
    ids[current] = low[current] = id++

    for (const next of graph[current]) {
        if (ids[next] === undefined) dfs(next)
        // use a onStack boolean list [false, false, false...] to make it linear
        if (stack.includes(next)) low[current] = Math.min(low[current], low[next])
    }

    if (ids[current] === low[current]) {
        for (let node = stack.pop();; node = stack.pop()) {
            low[node] = ids[current]
            if (node === current) break
        }
        sccCount++
    }
}

tarjan()
console.log(ids)
console.log(low)
console.log(sccCount)

