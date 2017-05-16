import React, { PropTypes } from 'react'
import SideMenu from 'components/SideMenu'
import { connect } from 'react-redux'
import { getCardCount } from 'selectors/card'
import { loadCards } from 'reducers/card'

class Component extends React.Component {
    static propTypes = {
        children: PropTypes.element,
        cardTotal: PropTypes.number,
        loadCards: PropTypes.func,
    }

    componentDidMount() {
        this.props.loadCards()
    }

    render() {
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
    }
}

export default connect(mapStateToProps, {
    loadCards,
})(Component)
