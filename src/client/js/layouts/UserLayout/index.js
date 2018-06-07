import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCardTotal, getRememberTotalCards, getWriteTotalCards } from 'js/selectors/card';
import { loadCards } from 'js/reducers/card';
import SideMenu from './SideMenu';
import NavBar from 'js/components/NavBar';

class Component extends React.Component {
    static propTypes = {
        cardTotal: PropTypes.number,
        cardRememberTotal: PropTypes.number,
        cardWriteTotal: PropTypes.number,
        loadCards: PropTypes.func,
        loading: PropTypes.bool,
        children: PropTypes.node,
    };

    componentDidMount() {
        this.props.loadCards();
    }

    render() {
        const { loading } = this.props;

        if (loading) {
            return (
                <div className="ui active inverted dimmer">
                    <div className="ui big text loader">Loading</div>
                </div>
            );
        }

        return (
            <div className="ui container">
                <NavBar />
                <div className="ui grid">
                    <div className="four wide column">
                        <SideMenu
                            cardTotal={this.props.cardTotal}
                            cardRememberTotal={this.props.cardRememberTotal}
                            cardWriteTotal={this.props.cardWriteTotal}
                        />
                    </div>
                    <div className="twelve wide column">{this.props.children}</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    cardTotal: getCardTotal(state.app.card),
    cardRememberTotal: getRememberTotalCards(state.app.card),
    cardWriteTotal: getWriteTotalCards(state.app.card),
    loading: state.app.card.loading,
});

export default connect(mapStateToProps, { loadCards })(Component);
