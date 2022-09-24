function mult(x, y) {
    if (y === 0) return 0
    const z = mult(x, Math.floor(y/2))

    if (y % 2 == 0) {
        return 2*z
    }

    return x + 2*z
}

/*
13   13 (odd)   z = 78 -> (2 * 78 + 13) = 169
13    6 (even)  z = 39 -> (2 * 39) = 78
13    3 (odd)   z = 13 -> (2 * 13 + 13) = 39
13    1 (odd)   z =  0 -> (2 * 0 + 13) = 13
13    0 (zero)         -> 0
*/
// const res = mult(13, 13)
// console.log(res)

/*
10    4    q = 1 r = 1 -> 2, 2
5     4    q = 0 r = 5
2     4    q = 0 r = 2
1     4    q = 0 r = 1
0     4    q = 0 r = 0
*/
function div(x, y) {
    if (x === 0) return [0, 0]
    let [q, r] = div(Math.floor(x/2), y)

    q *= 2
    r *= 2

    if (x % 2 == 1) {
        r++
    }

    if (r >= y) {
        r -= y
        q++
    }

    return [q, r]
}

console.log(div(10, 4))
