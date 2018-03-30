import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect, Switch } from 'react-router-dom'
import { getCardTotal, getRememberTotalCards, getWriteTotalCards } from 'js/selectors/card'
import { loadCards } from 'js/reducers/card'
import SideMenu from './SideMenu'

class Component extends React.Component {
    static propTypes = {
        cardTotal: PropTypes.number,
        cardRememberTotal: PropTypes.number,
        cardWriteTotal: PropTypes.number,
        loadCards: PropTypes.func,
        loading: PropTypes.bool,
        match: PropTypes.object,
    }

    componentDidMount() {
        this.props.loadCards()
    }

    render() {
        const { match, loading } = this.props

        if (loading) {
            return (
                <div className="ui active inverted dimmer">
                    <div className="ui big text loader">Loading</div>
                </div>
            )
        }

        return (
            <div className="ui grid">
                <div className="four wide column">
                    <SideMenu
                        cardTotal={this.props.cardTotal}
                        cardRememberTotal={this.props.cardRememberTotal}
                        cardWriteTotal={this.props.cardWriteTotal}
                    />
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
        cardTotal: getCardTotal(state.card),
        cardRememberTotal: getRememberTotalCards(state.card),
        cardWriteTotal: getWriteTotalCards(state.card),
        loading: state.card.loading,
    }
}

export default connect(mapStateToProps, {
    loadCards,
})(Component)
