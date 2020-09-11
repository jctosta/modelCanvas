import React from 'react';
import CanvasTile from './CanvasTile';

function Canvas(props) {

    console.log(props.source.canvas);

    const listItems = props.source.canvas.tiles.map((tile, idx) => 
        <CanvasTile 
            key={idx} 
            tile={tile} 
            tileId={idx} 
            addCard={props.addCard} 
            removeCard={props.removeCard} 
            updateCard={props.updateCard} />
    );

    return (
        <div className="columns is-multiline is-mobile">
            {listItems}
        </div>
    );
}

export default Canvas;