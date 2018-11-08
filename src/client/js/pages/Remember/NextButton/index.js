import React from 'react'
import PropTypes from 'prop-types'
import IconArrowRight from '@ieremeev/icons/arrow-right'

export default class NextButton extends React.Component {
    static propTypes = {
        onClick: PropTypes.func,
    }

    render() {
        return (
            <a className="circular ui huge icon button" onClick={this.props.onClick}>
                <IconArrowRight />
            </a>
        )
    }
}
