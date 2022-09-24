const fs = require('fs')

console.time('Time')

const board = readBoard()
const players = findPlayers()
const numberOfPlayers = Object.keys(players).length
const queue = []

for (let i = 1; i <= numberOfPlayers; i++) {
    player = players[i]
    bfs(player.position)
    while (player.explored) {
        player.explored = false
        unlockDoors()
    }
    console.log(`Player ${i}: ${Object.keys(player.visited).length}`)
}

console.timeEnd('Time')


function readBoard() {
    const _case = process.argv[2] || 0
    const file = fs.readFileSync(`cases/case${_case}`, 'utf8')
    return file.split('\n')
}

function getSquare(position) {
    return board[position.y][position.x]
}

function findPlayers() {
    const players = {}
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            let position = {x, y}
            let square = getSquare(position)
            if (Number(square)) { 
                players[square] = {
                    position, 
                    visited: {}, 
                    keys: [], 
                    doors: [],
                    explored: false
                }
            }
        }
    }
    return players
}

function bfs(start) { 
    queue.push(start)
    visit(start)

    while (queue.length > 0) {
        const current = queue.shift()

        for (const position of getAdjacentPositions(current)) {
            if (isKey(position)) handleKey(position)
            if (isDoor(position)) {
                handleDoor(position)
                continue
            }
            queue.push(position)
            visit(position)
        }
    }
    player.explored = true
}

function unlockDoors() {
    for (const door of player.doors) {
        if (player.keys.includes(door.key) && !door.open) {
            door.open = true
            bfs(door.position)
        }
    }
}

function getAdjacentPositions(position) {
    const directions = [
        {y: 0, x: 1},
        {y: 1, x: 0},
        {y: 0, x: -1},
        {y: -1, x: 0}
    ]
    return directions
    .map(direction => ({
        x: position.x + direction.x,
        y: position.y + direction.y 
    }))
    .filter(position => 
        !isVisited(position) && 
        !isWall(position))
}

function visit(position) {
    player.visited[`${position.x};${position.y}`] = true
}

function isVisited(position) {
    return player.visited[`${position.x};${position.y}`]
}

function isDoor(position) {
    return /[A-Z]/.test(getSquare(position));
}

function isKey(position) {
    return /[a-z]/.test(getSquare(position));
}

function isWall(position) {
    return getSquare(position) === '#'
}

function handleKey(position) {
    player.keys.push(getSquare(position))
}

function handleDoor(position) {
    if (!isKnownDoor(position)) {
        player.doors.push({
            position, 
            key: getSquare(position).toLowerCase(),
            open: false
        })
    }
}

function isKnownDoor(position) {
    const {x, y} = position
    const doors = player.doors
    return doors
        .find(door => 
            door.position.x === x && 
            door.position.y === y)
}