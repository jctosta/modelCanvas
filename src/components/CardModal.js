import React, { useState } from 'react';

function CardModal(props) {

    const [value, setValue] = useState('');

    const submitValue = () => {
        props.addCard(value);
        setValue('');
        props.hideModal();
    }

    return (
        <div className={`modal ${props.isActive}`}>
            <div className="modal-background" />
            <div className="modal-content">
                <div className="box">
                    <textarea className="textarea">{value}</textarea>
                    <button className="button is-primary" onClick={() => submitValue()}>Save</button>
                    <button className="button is-outlined">New Card</button>
                </div>
            </div>
            <button className="modal-close is-large" aria-label="close" />
        </div>
    );
}

export default CardModal;