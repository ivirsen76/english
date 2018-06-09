import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addBase, updateBase, loadBases } from 'js/reducers/base'
import List from './List'
import AddBase from './AddBase'

class Component extends React.Component {
    static propTypes = {
        list: PropTypes.array.isRequired,
        addBase: PropTypes.func.isRequired,
        updateBase: PropTypes.func.isRequired,
        loadBases: PropTypes.func,
        loading: PropTypes.bool,
    }

    componentDidMount() {
        this.props.loadBases()
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
            <div>
                <h2>Bases</h2>
                <div className="margin1">
                    <AddBase addBase={this.props.addBase} />
                </div>
                <List data={this.props.list} updateBase={this.props.updateBase} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    list: state.app.base.list,
    loading: state.app.base.loading,
})

export default connect(mapStateToProps, {
    addBase,
    updateBase,
    loadBases,
})(Component)
