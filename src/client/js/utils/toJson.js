import enzymeToJson from 'enzyme-to-json'
import _forEach from 'lodash.foreach'

const convert = obj => {
    if (obj.props) {
        const newProps = {}

        _forEach(obj.props, (prop, key) => {
            newProps[key] = typeof prop === 'object' ? {} : prop
        })

        obj.props = newProps
    }

    if (obj.children) {
        obj.children = obj.children.map(child => convert(child))
    }

    return obj
}

export default wrapper => {
    const json = enzymeToJson(wrapper)
    return convert(json)
}
