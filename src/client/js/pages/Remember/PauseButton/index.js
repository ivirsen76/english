import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import IconPause from '@ieremeev/icons/pause2'

export default class Component extends React.Component {
    static propTypes = {
        onClick: PropTypes.func,
        disabled: PropTypes.bool,
    }

    render() {
        let classname = classnames('ui', 'icon', { disabled: this.props.disabled }, 'button')

        return (
            <button className={classname} onClick={this.props.onClick}>
                <IconPause />
            </button>
        )
    }
}
