import React from 'react'
import PropTypes from 'prop-types'
import _isEqual from 'lodash/isEqual'

export default class Component extends React.Component {
    static propTypes = {
        update: PropTypes.func,
        values: PropTypes.object,
        isValid: PropTypes.bool,
        isValidating: PropTypes.bool,
    }

    componentDidMount() {
        this.values = this.props.values
    }

    componentDidUpdate() {
        const { values, isValid, isValidating, update } = this.props

        if (isValid && !isValidating && !_isEqual(this.values, values)) {
            this.values = values
            update(values)
        }
    }

    render() {
        return null
    }
}
