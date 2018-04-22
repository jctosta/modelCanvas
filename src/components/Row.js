import React from 'react';
import PropTypes from 'prop-types';

const CanvasRow = props => {
    return (
        <div className={`${props.className} canvas-row`}>
            {props.children}
        </div>
    );
};

CanvasRow.propTypes = {
    
};

export default CanvasRow;