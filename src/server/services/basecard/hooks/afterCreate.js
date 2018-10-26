module.exports = options => async hook => {
    const { baseId } = hook.data

    // get number of cards
    const result = await hook.service.find({ query: { baseId } })
    const count = result.data.length

    await hook.app.getService('bases').patch(baseId, { count })
}
