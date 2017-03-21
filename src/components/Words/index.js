import React, { PropTypes } from 'react';
import Table from '@ieremeev/table';


export const Words = ({ data }) => {
    const columns = [
        { name: 'text', label: 'Текст', filter: true, sort: true },
        { name: 'translate', label: 'Перевод', filter: true, sort: true },
        { name: 'label', label: 'Метка', filter: true, sort: true },
    ];

    return (
        <Table data={data} columns={columns} showRowNumber />
    );
};

Words.propTypes = {
    data: PropTypes.array.isRequired,
};

export default Words;
