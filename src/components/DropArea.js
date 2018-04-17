import React from 'react';
import PropTypes from 'prop-types';



const DropArea = props => {

    const cardList = props.source.cards.map((card, index) => 
        <div key={index} className="card">
            <p>{card.label}</p>
        </div>
    );

    return (
        <div className={`${props.className} drop-area`}>
            <p className={`${props.source.color} title`}>{props.source.title} {props.icon}</p>
            <div className="content">
                {cardList}
            </div>
        </div>
    );
};

DropArea.propTypes = {
    source: PropTypes.object,
};

export default DropArea;