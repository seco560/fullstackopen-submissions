import React from 'react';

const Filter = (props) => (
    <div>
        Filter names by <input value={props.filterValue} onChange={props.handleFilterChange} />
    </div>
);

export default Filter;