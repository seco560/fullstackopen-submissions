import React from 'react';

const DeletePersonButton = ({ onClick }) => (
    <button onClick={onClick}>Delete</button>
);

const PersonDisplay = (props) => (
    <p>{props.name} {props.phoneNumber} | <DeletePersonButton onClick={props.onClick} /></p>
);

const AllPersonsDisplay = (props) => (
    <div>
        {props.persons.filter((value) => value.name.toLowerCase()
            .includes(props.filterValue.toLowerCase()))
            .map(person => <PersonDisplay key={person.name} name={person.name}
                phoneNumber={person.phoneNumber} onClick={props.onClicks[person.name]}/>)
        }
    </div>
);

export default AllPersonsDisplay;