import React from 'react'
import PropTypes from 'prop-types'

export default class SemanticFieldWrapper extends React.Component {
    static propTypes = {
        meta: PropTypes.object,
        children: PropTypes.node,
    }

    render() {
        const { children, meta: { error, submitFailed } } = this.props
        const showError = error && submitFailed

        return (
            <div className={'field ' + (showError && 'error')}>
                {children}
                {showError && <div className="ui pointing red basic label">{error}</div>}
            </div>
        )
    }
}
