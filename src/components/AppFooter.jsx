import React from 'react';
import PropTypes from 'prop-types';
import {
  Navbar,
  NavLink,
} from 'reactstrap';

const AppFooter = (props) => {
  const storageMessage = () => {
    if (props.canvasModified) {
      return <span className="navbar-text">You have unsaved changes...</span>;
    }
    return <span className="navbar-text">Storage in Sync</span>;
  };
  const saveButton = () => {
    if (props.canvasModified) {
      return (<NavLink href="#save" onClick={props.updateStorage} >Save Canvas...</NavLink>);
    }
  };

  return (
    <Navbar light color="light" expand="md" fixed="bottom" className="border-top">
      {storageMessage()}
      {saveButton()}
      <NavLink href="#clear" onClick={props.cleanStorage}>Clear Storage...</NavLink>
    </Navbar>
  );
};

AppFooter.propTypes = {
  canvasModified: PropTypes.bool.isRequired,
  updateStorage: PropTypes.func.isRequired,
  cleanStorage: PropTypes.func.isRequired,
};

export default AppFooter;
