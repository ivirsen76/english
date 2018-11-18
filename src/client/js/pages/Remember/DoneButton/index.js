import React from 'react'
import PropTypes from 'prop-types'

export default class DoneButton extends React.Component {
    static propTypes = {
        onClick: PropTypes.func,
    }

    render() {
        return (
            <button type="button" className="ui button" onClick={this.props.onClick}>
                Запомнил!
            </button>
        )
    }
}
