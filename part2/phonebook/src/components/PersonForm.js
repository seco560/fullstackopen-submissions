import React from 'react';

const PersonForm = (props) => (
    <form>
        <div className="inputDiv">
            Name: <input value={props.newName} onChange={props.handleNameChange} />
        </div>
        <div className="inputDiv">
            Number: <input value={props.newPhoneNumber} onChange={props.handlePhoneNumberChange} />
        </div>
        <div>
            <button type="submit" onClick={props.addPerson}>add</button>
        </div>
    </form>
);

export default PersonForm;