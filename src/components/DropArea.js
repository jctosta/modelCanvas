import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';

const DropArea = props => {

    const cardList = props.source.cards.map((card) => 
        <Card>
            <CardBody>
                <CardText>{card.label}</CardText>
            </CardBody>
        </Card>
    );

    return (
        <div className={props.className + " drop-area"}>
            <div className="title">{props.source.title}</div>
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