import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default class PlayButton extends React.Component {
    static propTypes = {
        onClick: PropTypes.func,
        disabled: PropTypes.bool,
    }

    render() {
        let classname = classnames('ui', 'icon', { disabled: this.props.disabled }, 'button')

        return (
            <button className={classname} onClick={this.props.onClick}>
                <i className="icon-play3" />
            </button>
        )
    }
}
