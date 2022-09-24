const fs = require('fs')

const vertexes = ['A', 'B', 'C', 'D', 'E', 'F']
const edges = JSON.parse(fs.readFileSync('./graphs/kruskal.json'))
const parents = {}
const ranks = {}
const tree = []

function kruskal() {
    for (const vertex of vertexes) {
        makeSet(vertex)
    }

    edges.sort((u, v) => u[2] - v[2])

    for (const edge of edges) {
        const u = edge[0]
        const v = edge[1]

        if (_find(u) !== _find(v)) {
            tree.push(edge)
            union(u, v)
        }
    }
}

// make disjoint set
function makeSet(u) {
    parents[u] = u
    ranks[u] = 0
}

// find which set contains element
function find(u) {
    while (u !== parents[u]) u = parents[u]
    return u
}

// path compression find
function _find(u) {
    if (u !== parents[u]) parents[u] = _find(parents[u])
    return parents[u]
}

// unite sets containing vertexes u and v
function union(u, v) {
    const uSet = _find(u)
    const vSet = _find(v)

    if (ranks[uSet] > ranks[vSet]) {
        parents[v] = u
    } else {
        parents[u] = v
        if (ranks[uSet] === ranks[vSet]) ranks[v]++ 
    }
}

kruskal()
console.log(tree)