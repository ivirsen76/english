import React from 'react'
import PropTypes from 'prop-types'
import List from './List'
import ShowBase from './ShowBase'
import { loadBases } from 'js/reducers/base'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

class Component extends React.Component {
    static propTypes = {
        loadBases: PropTypes.func,
        loading: PropTypes.bool,
        match: PropTypes.object,
    }

    componentDidMount() {
        this.props.loadBases()
    }

    render() {
        const { match } = this.props

        if (this.props.loading) {
            return (
                <div className="ui active inverted dimmer">
                    <div className="ui big text loader">Loading</div>
                </div>
            )
        }

        return (
            <Switch>
                <Route path={match.url} component={List} exact />
                <Route path={match.url + '/:id'} component={ShowBase} />
            </Switch>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.app.base.loading,
})

export default connect(mapStateToProps, { loadBases })(Component)
