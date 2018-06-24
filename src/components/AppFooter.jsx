import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'reactstrap/lib/Navbar';
import NavLink from 'reactstrap/lib/NavLink';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCircleSolid from '@fortawesome/fontawesome-free-solid/faCircle';
import faCircleRegular from '@fortawesome/fontawesome-free-regular/faCircle';
import faAsterisk from '@fortawesome/fontawesome-free-solid/faAsterisk';

import i18n from '../i18n/i18n';

const AppFooter = (props) => {
  const storageMessage = () => {
    if (props.canvasModified) {
      // @TODO: Overwrite canvas
      return <span className="navbar-text"><FontAwesomeIcon icon={faAsterisk} /> <span className="d-none d-lg-inline">{i18n.t('canvas_footer_unsaved.label')}</span></span>;
    } else if (!props.canvasModified && props.isStorageEmpty()) {
      return <span className="navbar-text"><FontAwesomeIcon icon={faCircleRegular} /> <span className="d-none d-lg-inline">{i18n.t('canvas_footer_empty_storage.label')}</span></span>;
    }
    return <span className="navbar-text"><FontAwesomeIcon icon={faCircleSolid} /> <span className="d-none d-lg-inline">{i18n.t('canvas_footer_sync_storage.label')}</span></span>;
  };
  const saveButton = () => {
    if (props.canvasModified && !props.isStorageEmpty()) {
      return (<NavLink href="#" onClick={props.updateStorage} >{i18n.t('canvas_footer_overwrite_storage.label')}</NavLink>);
    } else if (props.canvasModified && props.isStorageEmpty()) {
      return (<NavLink href="#" onClick={props.updateStorage} >{i18n.t('canvas_footer_save_storage.label')}</NavLink>);
    }
    return (<NavLink href="#" />);
  };
  const clearButton = () => {
    if (!props.isStorageEmpty()) {
      return (<NavLink href="#" onClick={props.cleanStorage}>{i18n.t('canvas_footer_clear_storage.label')}</NavLink>);
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
