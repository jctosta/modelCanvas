import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'reactstrap/lib/Navbar';
import NavLink from 'reactstrap/lib/NavLink';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCircleSolid from '@fortawesome/fontawesome-free-solid/faCircle';
import faCircleRegular from '@fortawesome/fontawesome-free-regular/faCircle';
import faAsterisk from '@fortawesome/fontawesome-free-solid/faAsterisk';

const AppFooter = (props) => {
  const storageMessage = () => {
    if (props.canvasModified) {
      // @TODO: Overwrite canvas
      return <span className="navbar-text"><FontAwesomeIcon icon={faAsterisk} /> You have unsaved changes...</span>;
    } else if (!props.canvasModified && props.isStorageEmpty()) {
      return <span className="navbar-text"><FontAwesomeIcon icon={faCircleRegular} /> Storage is Empty</span>;
    }
    return <span className="navbar-text"><FontAwesomeIcon icon={faCircleSolid} /> Storage in Sync</span>;
  };
  const saveButton = () => {
    if (props.canvasModified && !props.isStorageEmpty()) {
      return (<NavLink href="#" onClick={props.updateStorage} >Overwrite Canvas...</NavLink>);
    } else if (props.canvasModified && props.isStorageEmpty()) {
      return (<NavLink href="#" onClick={props.updateStorage} >Save Canvas...</NavLink>);
    }
    return (<NavLink href="#" />);
  };
  const clearButton = () => {
    if (!props.isStorageEmpty()) {
      return (<NavLink href="#" onClick={props.cleanStorage}>Clear Storage...</NavLink>);
    }
    return (<NavLink href="#" />);
  };

  return (
    <Navbar light color="light" expand="md" fixed="bottom" className="border-top">
      {storageMessage()}
      {saveButton()}
      {clearButton()}
    </Navbar>
  );
};

AppFooter.propTypes = {
  canvasModified: PropTypes.bool.isRequired,
  updateStorage: PropTypes.func.isRequired,
  cleanStorage: PropTypes.func.isRequired,
  isStorageEmpty: PropTypes.func.isRequired,
};

export default AppFooter;
