import React from 'react'
import PropTypes from 'prop-types'
import Table from '@ieremeev/table'
import format from 'date-fns/format'
import EditCard from '../EditCard'
import DeleteCard from '../DeleteCard'
import AudioLink from 'client/js/components/AudioLink'
import style from './style.module.scss'

export const Cards = ({ data, deleteCard, updateCard }) => {
    const columns = [
        {
            name: 'actions',
            label: '',
            render: (value, row) => (
                <div>
                    <EditCard updateCard={updateCard} initialValues={row} />
                    <DeleteCard deleteCard={deleteCard} id={row.id} />
                </div>
            ),
            className: style.actions,
        },
        {
            name: 'text',
            label: 'Text',
            filter: true,
            sort: true,
            render: (value, row) => <AudioLink text={value} audioUrl={row.usSoundFile} />,
        },
        {
            name: 'translate',
            label: 'Translate',
            filter: true,
            sort: true,
            render: (value, row) => <AudioLink text={value} audioUrl={row.ruSoundFile} />,
        },
        {
            name: 'label',
            label: 'Label',
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

    return <Table data={data} columns={columns} showRowNumber />
}

Cards.propTypes = {
    data: PropTypes.array.isRequired,
    updateCard: PropTypes.func,
    deleteCard: PropTypes.func,
}

export default Cards
