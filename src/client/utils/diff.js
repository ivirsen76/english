let retA = ''
let unickTable = []

function GetLCSAlgoritm(_a, _b) {
    const a = _a.split(' ')
    const b = _b.split(' ')
    let maxLen = {}
    const x = a.length
    const y = b.length

    for (let i = 0; i <= x; i++) {
        maxLen[i] = {}
        for (let j = 0; j <= y; j++) maxLen[i][j] = ''
    }

    for (let i = x - 1; i >= 0; i--) {
        for (let j = y - 1; j >= 0; j--) {
            // eslint-disable-next-line no-mixed-operators
            if (a[i] === b[j]) maxLen[i][j] = 1 + 1 * maxLen[i + 1][j + 1]
            else maxLen[i][j] = Math.max(maxLen[i + 1][j], maxLen[i][j + 1])
        }
    }

    let rez = ''
    let i = 0
    let j = 0
    while (maxLen[i][j] !== 0 && i < x && j < y) {
        if (a[i] === b[j]) {
            rez = rez + a[i] + ' '
            i++
            j++
        } else if (maxLen[i][j] === maxLen[i + 1][j]) i++
        else j++
    }

    return rez.substring(0, rez.length - 1)
}

function GetUnickStr(arr) {
    let s = ''

    for (let i = 0; i <= arr.length - 1; i++) {
        const index = unickTable.indexOf(arr[i])
        s = s + index + ' '
    }

    return s.substring(0, s.length - 1)
}

function SelDiffsStr(_a, _b) {
    const longest = GetLCSAlgoritm(_a, _b).split(' ')

    const a = _a.split(' ')
    const rA = []

    let i1 = 0
    let i2 = 0
    let iters = a.length
    for (let i = 0; i < iters; i++) {
        let simbol = []
        if (longest[i1] === a[i2]) {
            simbol.push(longest[i1])
            simbol.push('*')
            rA.push(simbol)
            i1++
            i2++
        } else {
            simbol.push(a[i2])
            simbol.push('-')
            rA.push(simbol)
            i2++
        }
    }
    retA = rA
}

export default (aText, bText) => {
    const ignoreArray = [' ', '-', '%', ',', '.', ':', '!', '?', '[', ']', '/']

    const arr1 = aText.split('')
    const arr2 = bText.split('')

    let arrA = []
    for (let i = 0; i <= arr1.length - 1; i++) {
        if (ignoreArray.includes(arr1[i])) arr1[i] = '*' + arr1[i]

        arrA.push(arr1[i].toLowerCase())
    }

    let arrB = []
    for (let i = 0; i <= arr2.length - 1; i++) {
        if (ignoreArray.includes(arr2[i])) arr2[i] = '*' + arr2[i]

        arrB.push(arr2[i].toLowerCase())
    }

    for (let i = 0; i <= arrA.length - 1; i++) {
        if (!unickTable.includes(arrA[i])) unickTable.push(arrA[i])
    }
    for (let i = 0; i <= arrB.length - 1; i++) {
        if (!unickTable.includes(arrB[i])) unickTable.push(arrB[i])
    }

    const strA = GetUnickStr(arrA)
    const strB = GetUnickStr(arrB)
    SelDiffsStr(strA, strB)

    const result = []
    let lastItem
    for (let i = 0; i <= arr1.length - 1; i++) {
        let first = arr1[i].substring(0, 1)
        const item = {}
        if (first !== '*') {
            if (retA[i][1] !== '*') {
                item.added = true
            }

            item.text = first
        } else {
            item.text = arr1[i].substring(1, 2)
        }

        if (lastItem && item.added === lastItem.added) {
            lastItem.text += item.text
        } else {
            if (lastItem) result.push(lastItem)
            lastItem = { ...item }
        }
    }

    if (lastItem) result.push(lastItem)

    return result
}
