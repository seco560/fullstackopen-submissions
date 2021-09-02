import React from 'react';

const PersonDisplay = (props) => (
    <p>{props.name} {props.phoneNumber}</p>
);

const AllPersonsDisplay = (props) => (
    <div>
        {props.persons.filter((value) => value.name.toLowerCase()
            .includes(props.filterValue.toLowerCase()))
            .map(person => <PersonDisplay key={person.name} name={person.name}
                phoneNumber={person.phoneNumber} />)
        }
    </div>
)

export default AllPersonsDisplay;