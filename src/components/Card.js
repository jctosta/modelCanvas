import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Card extends Component {
    render() {
        const { text } = this.props;
        return (
            <li draggable onDragStart={this.props.dragHandler} className={`${this.props.className} canvas-card`} data-id={this.props.id}>
                {text}
            </li>
        );
    }
}

Card.propTypes = {
    text: PropTypes.string.isRequired
};

export default Card;