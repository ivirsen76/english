import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addBase, updateBase } from 'js/reducers/base'
import Table from '@ieremeev/table'
import { Link } from 'react-router-dom'
import AddBase from './AddBase'
import EditBase from './EditBase'

class Component extends React.Component {
    static propTypes = {
        base: PropTypes.object,
        list: PropTypes.array.isRequired,
        addBase: PropTypes.func.isRequired,
        updateBase: PropTypes.func.isRequired,
    }

    addBase = values => this.props.addBase({ ...values, parentId: this.props.base.id })

    render() {
        const columns = [
            {
                name: 'actions',
                label: '',
                render: (value, row) => (
                    <div>
                        <EditBase
                            baseId={row.id}
                            updateBase={this.props.updateBase}
                            initialValues={row}
                        />
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
                name: 'count',
                label: 'Count',
                filter: true,
                sort: true,
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
                <div className="margin1">
                    <AddBase addBase={this.addBase} />
                </div>
                <Table data={this.props.list} columns={columns} showRowNumber />
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    list: state.app.base.list.filter(item => item.parentId === props.base.id),
})

export default connect(mapStateToProps, { addBase, updateBase })(Component)
