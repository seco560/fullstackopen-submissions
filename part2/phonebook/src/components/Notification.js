import React from 'react';

const Notification = ({message, isSuccess}) => {
    if (message === null) return null;

    const goodDecorations = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        paddingLeft: 'auto',
        paddingRight: 'auto',
    };

    const badDecorations = {...goodDecorations, color: 'red'};

    return (
        <div className="error" style={isSuccess ? goodDecorations : badDecorations}>{message}</div>
    )
}

export default Notification;