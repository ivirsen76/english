import React from 'react'
import PropTypes from 'prop-types'
import Table from '@ieremeev/table'
import EditBase from '../EditBase'

export const Bases = ({ data, updateBase }) => {
    const columns = [
        {
            name: 'actions',
            label: '',
            render: (value, row) => (
                <div>
                    <EditBase updateBase={updateBase} initialValues={row} />
                </div>
            ),
        },
        {
            name: 'title',
            label: 'Title',
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

    return <Table data={data} columns={columns} showRowNumber />
}

Bases.propTypes = {
    data: PropTypes.array.isRequired,
    updateBase: PropTypes.func,
}

export default Bases
