import React from 'react'
import PropTypes from 'prop-types'
import IconArrowRight from '@ieremeev/icons/arrow-right6'

export default class NextButton extends React.Component {
    static propTypes = {
        goNext: PropTypes.func,
    }

    render() {
        return (
            <button
                type="button"
                className="huge circular ui icon button"
                onClick={this.props.goNext}
            >
                <IconArrowRight />
            </button>
        )
    }
}
