import React from 'react'
import PropTypes from 'prop-types'
import Table from '@ieremeev/table'
import format from 'date-fns/format'
import AudioLink from 'client/js/components/AudioLink'
import { removeMeta } from 'client/js/utils/text.js'
import { statuses } from 'client/js/reducers/card.js'
import DeleteCard from '../DeleteCard'
import EditCard from '../EditCard'
import style from './style.module.scss'

export const Cards = ({ data, deleteCard, updateCard }) => {
    const columns = [
        {
            name: 'actions',
            label: '',
            render: (value, row) => (
                <div>
                    <EditCard updateCard={updateCard} initialValues={row} cardId={row.id} />
                    <DeleteCard deleteCard={deleteCard} id={row.id} />
                </div>
            ),
            className: style.actions,
        },
        {
            name: 'text',
            label: 'Текст',
            filter: true,
            sort: true,
            render: (value, row) => (
                <AudioLink text={removeMeta(value)} audioUrl={row.usSoundFile} />
            ),
        },
        {
            name: 'translate',
            label: 'Перевод',
            filter: true,
            sort: true,
            render: (value, row) => (
                <AudioLink text={removeMeta(value)} audioUrl={row.ruSoundFile} />
            ),
        },
        {
            name: 'label',
            label: 'Метка',
            filter: true,
            sort: true,
        },
        {
            name: 'status',
            label: 'Статус',
            filter: true,
            filterSettings: {
                type: 'selectbox',
                options: statuses,
            },
            sort: true,
            render: (value, row) => {
                const status = statuses.find(item => item.value === row.status)
                return status ? status.label : statuses[0].label
            },
        },
        {
            name: 'createdAt',
            label: 'Добавлено',
            sort: true,
            render: (value, row) => format(new Date(value), 'DD.MM.YYYY'),
        },
    ]

    return (
        <Table
            data={data}
            columns={columns}
            showRowNumber
            orderBy="createdAt"
            isAscentOrder={false}
            saveSettings
        />
    )
}

Cards.propTypes = {
    data: PropTypes.array.isRequired,
    updateCard: PropTypes.func,
    deleteCard: PropTypes.func,
}

export default Cards
