import React from 'react'
import PropTypes from 'prop-types'
import Table from '@ieremeev/table'
import format from 'date-fns/format'
import EditCard from '../EditCard'
import DeleteCard from '../DeleteCard'
import AudioLink from 'client/js/components/AudioLink'
import { removeMeta } from 'client/js/utils/text.js'
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
