import React from 'react'
import PropTypes from 'prop-types'
import SideMenu from 'components/SideMenu'
import { connect } from 'react-redux'
import { getCardCount } from 'selectors/card'
import { loadCards } from 'reducers/card'

class Component extends React.Component {
    static propTypes = {
        children: PropTypes.element,
        cardTotal: PropTypes.number,
        loadCards: PropTypes.func,
        loading: PropTypes.bool,
    }

    componentDidMount() {
        this.props.loadCards()
    }

    render() {
        if (this.props.loading) {
            return (
                <div className="ui active inverted dimmer">
                    <div className="ui big text loader">Loading</div>
                </div>
            )
        }

        return (
            <div className="ui grid">
                <div className="four wide column">
                    <SideMenu cardTotal={this.props.cardTotal} />
                </div>
                <div className="twelve wide column">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        cardTotal: getCardCount(state),
        loading: state.card.loading,
    }
}

export default connect(mapStateToProps, {
    loadCards,
})(Component)
