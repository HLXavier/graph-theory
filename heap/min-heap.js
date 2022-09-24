class Heap {
    constructor() {
        this.heap = []
        this.size = 0
    }

    add(key) {
        this.heap[this.size] = key
        this.swim(this.size)
        this.size++
    }

    poll() {
        this.swap(0, this.size - 1)
        const top = this.heap.pop()
        this.sink(0)
    }

    less(pos1, pos2 = this.father(pos1)) {
        return this.heap[pos1] < this.heap[pos2]
    }

    father(pos) {
        return Math.floor((pos - 1) / 2)
    }

    left(pos) {
        return pos * 2 + 1
    }

    rigth(pos) {
        return pos * 2 + 2
    }

    swim(pos) {
        for (pos; this.less(pos); pos = this.father(pos)) {
            this.swap(this.father(pos), pos)
        }
    }

    sink(pos) {
        const left = this.left(pos)
        const rigth = this.rigth(pos)
        let min = left

        if (left >= this.size) return
        if (rigth < this.size && this.less(rigth, left)) min = rigth
        if (this.less(min, pos)) {
            this.swap(pos, min)
            this.sink(min)
        }
    }

    swap(pos1, pos2) {
        const key1 = this.heap[pos1]
        const key2 = this.heap[pos2]

        this.heap[pos1] = key2
        this.heap[pos2] = key1
    }
}


// const heap = new Heap()
// heap.add(13)
// heap.add(7)
// heap.add(6)
// heap.add(12)
// heap.add(19)
// heap.add(14)
// heap.add(12)
// heap.add(8)
// heap.add(11)
// heap.add(5)
// heap.add(1)
// heap.poll()
// console.log(heap.heap)
