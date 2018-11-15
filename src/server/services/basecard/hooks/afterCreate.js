module.exports = options => async hook => {
    const bases = hook.app.getService('bases')
    const sum = (result, value) => result + value

    const updateCount = async baseId => {
        const baseInfo = (await bases.get(baseId)).dataValues

        let count
        if (baseInfo.type === 'folder') {
            count = (await bases.find({
                query: { parentId: baseId, $select: ['count'] },
            })).data
                .map(item => item.dataValues.count)
                .reduce(sum, 0)
        } else {
            count = (await hook.service.find({ query: { baseId, $select: ['id'] } })).data.length
        }

        await bases.patch(baseId, { count })

        if (baseInfo.parentId !== 0) {
            await updateCount(baseInfo.parentId)
        }
    }

    await updateCount(hook.data.baseId)
}
