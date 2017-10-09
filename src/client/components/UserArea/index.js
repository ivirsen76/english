import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect, Switch } from 'react-router-dom'
import { getCardTotal, getRememberTotalCards, getWriteTotalCards } from 'selectors/card'
import { loadCards } from 'reducers/card'
import SideMenu from './SideMenu'
import CardsPage from 'components/CardsPage'
import RememberPage from 'components/RememberPage'
import WritePage from 'components/WritePage'
import DownloadMp3Page from 'components/DownloadMp3Page'
import BasePage from 'components/BasePage'

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
                    <Switch>
                        <Route path={`${match.url}/cards`} component={CardsPage} />
                        <Route path={`${match.url}/remember`} component={RememberPage} />
                        <Route path={`${match.url}/write`} component={WritePage} />
                        <Route path={`${match.url}/mp3`} component={DownloadMp3Page} />
                        <Route path={`${match.url}/base`} component={BasePage} />
                        <Redirect to={`${match.url}/cards`} />
                    </Switch>
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
