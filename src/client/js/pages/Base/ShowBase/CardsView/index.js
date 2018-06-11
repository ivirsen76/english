import React from 'react'
import PropTypes from 'prop-types'
import format from 'date-fns/format'
import Table from '@ieremeev/table'
import { connect } from 'react-redux'
import AddCard from './AddCard'
import { addCard } from 'js/reducers/base.js'

class ShowBase extends React.Component {
    static propTypes = {
        base: PropTypes.object,
        list: PropTypes.array,
        addCard: PropTypes.func,
    }

    addCard = values => {
        const baseId = this.props.base.id
        this.props.addCard({ ...values, baseId })
    }

    render() {
        const columns = [
            // {
            //     name: 'actions',
            //     label: '',
            //     render: (value, row) => (
            //         <div>
            //             <EditCard updateCard={updateCard} initialValues={row} />
            //             <DeleteCard deleteCard={deleteCard} id={row.id} />
            //         </div>
            //     ),
            //     className: style.nowrap,
            // },
            {
                name: 'text',
                label: 'Text',
                filter: true,
                sort: true,
            },
            {
                name: 'translate',
                label: 'Translate',
                filter: true,
                sort: true,
            },
            {
                name: 'createdAt',
                label: 'Created at',
                sort: true,
                render: (value, row) => format(new Date(value), 'DD.MM.YYYY'),
            },
        ]

        return (
            <div>
                <div className="margin1">
                    <AddCard addCard={this.addCard} />
                </div>
                <Table data={this.props.list} columns={columns} showRowNumber />
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    list: state.app.base.cards.filter(item => item.baseId === props.base.id),
})

export default connect(mapStateToProps, { addCard })(ShowBase)
