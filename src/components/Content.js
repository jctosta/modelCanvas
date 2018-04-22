import React from 'react';
import PropTypes from 'prop-types';

const CanvasContent = props => {
    if (props.className !== undefined) {
        return (
            <div className={`${props.className} canvas-content`}>
                <div className={`title`}>{props.title}</div>
                {props.children}
            </div>
        );
    } else {
        return (
            <div className="canvas-content">
                <div className="title">{props.title}</div>
                {props.children}
            </div>
        );
    }
    
};

CanvasContent.propTypes = {
    
};

export default CanvasContent;