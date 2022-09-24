const fs = require('fs')

const graph = {}

let id = 0
const ids = {}
const low = {}
const onStack = {}
const stack = []

const scc = []
let sccCount = 0

function _2sat() {
    buildGraph()
    tarjan()

    for (let component of scc) {
        for (const variable of component) {
            if (component.includes((-variable).toString())) return false
        }
    }
    return true
}

function tarjan() {
    for (const node of Object.keys(graph)) {
        if (ids[node] === undefined) dfs(node)
    }
}

function dfs(current) {
    stack.push(current)
    onStack[current] = true
    ids[current] = low[current] = id++

    for (const next of graph[current]) {
        if (ids[next] === undefined) dfs(next)
        if (onStack[next]) low[current] = Math.min(low[current], low[next])
    }

    if (ids[current] === low[current]) {
        scc[sccCount] = []
        for (let node = stack.pop();; node = stack.pop()) {
            onStack[node] = false
            low[node] = low[current]
            scc[sccCount].push(node)
            if (node === current) break
        }
        sccCount++
    }
}

function buildGraph() {
    const conjunction = fs.readFileSync(`cases/case${process.argv[2] || 0}`, 'utf8')
        .split('\n')

    for (const clause of conjunction) {
        const [var1, var2] = clause.split(' ')

        if(!graph[var1]) {
            graph[var1] = []
            graph[-var1] = []
        }
        if(!graph[var2]) { 
            graph[var2] = []
             graph[-var2] = [] 
        }
    
        graph[-var1].push(var2)
        graph[-var2].push(var1)
    }
}

console.log(`Solution: ${_2sat()}\n`)

console.log(`Strongly connected components:`)
for (const component of scc) {
    console.log(component)
}

console.log(`\nImplication graph (as a adjacency list):`)
console.log(graph)