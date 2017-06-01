import React from 'react'
import PropTypes from 'prop-types'
// import EditCard from 'components/CardsPage/EditCard'
import ClickButton from '@ieremeev/button'

export default class Component extends React.Component {
    static propTypes = {
        card: PropTypes.object,
        onSuccess: PropTypes.func,
    }
    render() {
        return (
            <ClickButton
                className="ui tiny green icon button"
                title={<i className="icon-pencil" />}
            />
        )

        // return <EditCard row={this.props.card} onSuccess={this.props.onSuccess} />
    }
}
