import React, { useState, useEffect } from 'react';
import CardModal from './CardModal';
import CanvasCard from './CanvasCard';

function CanvasTile(props) {

    const listCards = props.tile.cards.map((card, index) => 
        <CanvasCard 
            content={card.content} 
            tileId={props.tileId} 
            index={index} 
            removeCard={props.removeCard} 
            updateCard={props.updateCard} 
        />
    );

    const [value, setValue] = useState('');
    const [displayForm, setDisplayForm] = useState(false);
    const [cardValue, setCardValue] = useState('');

    const submitValue = tileId => {
        console.log(value);
        props.addCard(tileId, value);
        setDisplayForm(!displayForm);
        setValue('');
    }

    const handleChange = event => {
        setValue(event.target.value);
    }

    

    return (
        <div className={`column ${props.tile.size}`}>
            <div className="tile is-child box">
                <p className="title is-5">{props.tile.title}</p>
                <p className="subtitle">With some content</p>
                <div className="container">
                    {listCards}
                </div>
                <button className="button is-primary" onClick={() => setDisplayForm(!displayForm)}>{displayForm ? 'Cancel' : 'Add Card'}</button>
                <div className={displayForm ? '' : 'is-hidden'}>
                    <hr/>
                    <div className="field">
                        <div className="control">
                            <textarea className="textarea" value={value} onChange={handleChange}></textarea>
                        </div>
                    </div>
                    <div className="field is-grouped is-grouped-left">
                        <div className="control">
                            <button className="button is-primary" onClick={() => submitValue(props.tileId)}>Save</button>
                        </div>
                        <div className="control">
                            <button className="button is-text">Cancel</button>
                        </div>
                    </div>
                </div>
                {/* <CardModal addCard={props.addCard.bind(this)} isActive={getModalStatus()} /> */}
            </div>
        </div>
    );
}

export default CanvasTile;