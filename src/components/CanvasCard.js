import React, {useState} from 'react';

function CanvasCard(props) {

    const [cardValue, setCardValue] = useState(props.content);
    const [displayForm, setDisplayForm] = useState(false);

    const handleCardChange = event => {
        setCardValue(event.target.value);
    }

    const handleSaveUpdate = () => {
        props.updateCard(props.tileId, props.index, cardValue);
        setDisplayForm(!displayForm);
    }

    return (
        <div className="box my-3">
            <article className={`media ${displayForm ? 'is-hidden' : ''}`}>
                <div className="media-content" onClick={() => setDisplayForm(!displayForm)}>
                    <div className="content">{cardValue}</div>
                </div>
                <div className="media-right">
                    <button className="delete" onClick={() => props.removeCard(props.tileId, props.index)}></button>
                </div>
            </article>
            <div className={displayForm ? '' : 'is-hidden'}>
                <div className="field">
                    <div className="control">
                        <textarea className="textarea" value={cardValue} onChange={handleCardChange}></textarea>
                    </div>
                </div>
                <div className="field is-grouped is-grouped-left">
                    <div className="control">
                        <button className="button is-primary" onClick={handleSaveUpdate}>Update</button>
                    </div>
                    <div className="control">
                        <button className="button is-text" onClick={() => setDisplayForm(!displayForm)}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CanvasCard;