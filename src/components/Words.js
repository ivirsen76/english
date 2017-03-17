import React, { PropTypes } from 'react';
import Table from '@ieremeev/table';


const Words = ({ data }) => {
    const columns = [
        { name: 'id', label: 'ID' },
        { name: 'name', label: 'Name', filter: true, sort: true },
        { name: 'email', label: 'Email' },
    ];

    return (
        <Table data={data} columns={columns} />
    );
};

Words.propTypes = {
    data: PropTypes.array.isRequired,
};

export default Words;
