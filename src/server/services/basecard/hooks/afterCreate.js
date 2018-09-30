module.exports = options => async hook => {
    const { baseId } = hook.data

    // get number of cards
    const result = await hook.service.find({ baseId })
    const count = result.data.length

    await hook.app.service('/bases').patch(baseId, { count })
}
