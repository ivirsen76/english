const _find = require('lodash/find') // eslint-disable-line no-underscore-dangle
const _cloneDeep = require('lodash/cloneDeep') // eslint-disable-line no-underscore-dangle

module.exports = function override(config, env) {
    // Add babel-polyfill
    config.entry.unshift('babel-polyfill')

    // Exclude scss from fallback rule
    config.module.rules = config.module.rules.map(rule => {
        if (rule.test || !rule.exclude) {
            return rule
        }

        return Object.assign({}, rule, {
            exclude: rule.exclude.concat(/\.scss$/),
        })
    })

    // Generate scss rule based on css rule
    const cssRule = _find(config.module.rules, rule => rule.test && rule.test.toString().includes('.css'))
    const scssLoader = (cssRule.use || cssRule.loader)
        .map(item => {
            if (item.loader && item.loader.includes('/css-loader')) {
                item = _cloneDeep(item)
                item.options.modules = true
                item.options.localIdentName = env === 'development'
                    ? '[name]__[local]___[hash:base64:5]'
                    : '[hash:base64]'
            }

            return item
        })
        .concat('sass-loader')

    const scssRule = { test: /\.module\.scss$/ }
    if (cssRule.use) {
        scssRule.use = scssLoader
    }
    if (cssRule.loader) {
        scssRule.loader = scssLoader
    }
    config.module.rules.push(scssRule)

    return config
}
