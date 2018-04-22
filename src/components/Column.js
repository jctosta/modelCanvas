import React from 'react';
import PropTypes from 'prop-types';

const CanvasColumn = props => {
    return (
        <div className={`${props.className} canvas-column`}>
            {props.children}
        </div>
    );
};

CanvasColumn.propTypes = {
    
};

export default CanvasColumn;