import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addBase, updateBase } from 'js/reducers/base'
import Table from '@ieremeev/table'
import { Link } from 'react-router-dom'
import AddBase from '../AddBase'
import EditBase from '../EditBase'

class Component extends React.Component {
    static propTypes = {
        list: PropTypes.array.isRequired,
        addBase: PropTypes.func.isRequired,
        updateBase: PropTypes.func.isRequired,
    }

    render() {
        const columns = [
            {
                name: 'actions',
                label: '',
                render: (value, row) => (
                    <div>
                        <EditBase updateBase={this.props.updateBase} initialValues={row} />
                    </div>
                ),
            },
            {
                name: 'title',
                label: 'Title',
                filter: true,
                sort: true,
                render: (value, row) => <Link to={`/user/base/${row.id}`}>{value}</Link>,
            },
            {
                name: 'price',
                label: 'Price',
                filter: true,
                sort: true,
            },
        ]

        return (
            <div>
                <h2>Bases</h2>
                <div className="margin1">
                    <AddBase addBase={this.props.addBase} />
                </div>
                <Table data={this.props.list} columns={columns} showRowNumber />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    list: state.app.base.list,
})

export default connect(mapStateToProps, { addBase, updateBase })(Component)
