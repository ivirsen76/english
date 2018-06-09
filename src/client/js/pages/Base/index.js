import React from 'react'
import PropTypes from 'prop-types'
import List from './List'
import ShowBase from './ShowBase'
import { Route, Switch } from 'react-router-dom'

export default class Component extends React.Component {
    static propTypes = {
        match: PropTypes.object,
    }

    static defaultProps = {
        column: 'name',
    }

    render() {
        const { match } = this.props

        return (
            <div>
                <Switch>
                    <Route path={match.url} component={List} exact />
                    <Route path={match.url + '/:id'} component={ShowBase} />
                </Switch>
            </div>
        )
    }
}
