import React from 'react'
import PropTypes from 'prop-types'
import IconArrowRight from '@ieremeev/icons/arrow-right'

export default class NextButton extends React.Component {
    static propTypes = {
        goNext: PropTypes.func,
    }

    render() {
        return (
            <button className="huge circular ui icon button" onClick={this.props.goNext}>
                <IconArrowRight />
            </button>
        )
    }
}
