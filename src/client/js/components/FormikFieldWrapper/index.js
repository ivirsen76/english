import React from 'react'
import PropTypes from 'prop-types'

export default class FormikFieldWrapper extends React.Component {
    static propTypes = {
        field: PropTypes.object,
        form: PropTypes.object,
        children: PropTypes.node,
    }

    render() {
        const { field, form } = this.props
        const error = form.errors[field.name]

        return (
            <div className={'field ' + (error && 'error')}>
                {this.props.children}
                {error && <div className="ui pointing red basic label">{error}</div>}
            </div>
        )
    }
}
