export const getParents = (bases, baseId) => {
    const result = []

    const processData = id => {
        const base = bases.find(item => item.id === id)

        if (!base) {
            return
        }

        const parentId = base.parentId
        const parent = bases.find(item => item.id === parentId)
        if (parent) {
            result.push(parent)
            processData(parent.id)
        }
    }

    processData(baseId)

    return result.reverse()
}
