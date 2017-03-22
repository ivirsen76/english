import React, { PropTypes } from 'react';
import Table from '@ieremeev/table';
import EditCard from 'components/EditCard';
import DeleteCard from 'components/DeleteCard';


export const Cards = ({ data, deleteCard, updateCard }) => {
    const columns = [{
        name: 'actions',
        label: '',
        render(value, row) {
            return (
                <div>
                    <EditCard updateCard={updateCard} initialValues={row} />
                    <DeleteCard deleteCard={deleteCard} id={row.id} />
                </div>
            );
        },
    }, {
        name: 'text',
        label: 'Текст',
        filter: true,
        sort: true,
    }, {
        name: 'translate',
        label: 'Перевод',
        filter: true,
        sort: true,
    }, {
        name: 'label',
        label: 'Метка',
        filter: true,
        sort: true,
    }];

    return (
        <Table
            data={data}
            columns={columns}
            showRowNumber
        />
    );
};

Cards.propTypes = {
    data: PropTypes.array.isRequired,
    updateCard: PropTypes.func.isRequired,
    deleteCard: PropTypes.func.isRequired,
};

export default Cards;
