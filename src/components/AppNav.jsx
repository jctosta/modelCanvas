import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'reactstrap/lib/Navbar';
import Collapse from 'reactstrap/lib/Collapse';
import NavbarToggler from 'reactstrap/lib/NavbarToggler';
import NavbarBrand from 'reactstrap/lib/NavbarBrand';
import Nav from 'reactstrap/lib/Nav';
import NavItem from 'reactstrap/lib/NavItem';
import NavLink from 'reactstrap/lib/NavLink';
import UncontrolledDropdown from 'reactstrap/lib/UncontrolledDropdown';
import DropdownToggle from 'reactstrap/lib/DropdownToggle';
import DropdownMenu from 'reactstrap/lib/DropdownMenu';
import DropdownItem from 'reactstrap/lib/DropdownItem';
import Modal from 'reactstrap/lib/Modal';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import ModalBody from 'reactstrap/lib/ModalBody';
import ModalFooter from 'reactstrap/lib/ModalFooter';
import Button from 'reactstrap/lib/Button';
import Form from 'reactstrap/lib/Form';
import Label from 'reactstrap/lib/Label';
import Input from 'reactstrap/lib/Input';
import FormGroup from 'reactstrap/lib/FormGroup';
import Alert from 'reactstrap/lib/Alert';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';
import faUpload from '@fortawesome/fontawesome-free-solid/faUpload';
import faDownload from '@fortawesome/fontawesome-free-solid/faDownload';
import ContentEditable from 'react-contenteditable';
import snakeCase from 'lodash/snakeCase';

import i18n from '../i18n/i18n';

// import Ajv from 'ajv';
// import canvasSchema from '../data/canvas-schema.json';

class AppNav extends React.Component {
  static handleFile(e) {
    e.preventDefault(0);
  }

  static handleDragEnter(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  static handleDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  constructor(props) {
    super(props);

    // Navbar toggler
    this.navbarToggle = this.navbarToggle.bind(this);

    // Modal toggler
    this.openImportModal = this.openImportModal.bind(this);
    this.openExportModal = this.openExportModal.bind(this);
    this.openNewCanvasModal = this.openNewCanvasModal.bind(this);
    this.openHelpModal = this.openHelpModal.bind(this);

    // Event handlers
    this.handleDrop = this.handleDrop.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleExportCanvas = this.handleExportCanvas.bind(this);
    this.handleCreateCanvas = this.handleCreateCanvas.bind(this);
    this.handleCanvasNameChange = this.handleCanvasNameChange.bind(this);

    // Modal Renders
    this.renderImportFileModal = this.renderImportFileModal.bind(this);
    this.renderExportModal = this.renderExportModal.bind(this);
    this.renderNewCanvasModal = this.renderNewCanvasModal.bind(this);
    this.renderHelpModal = this.renderHelpModal.bind(this);

    this.state = {
      navbarIsOpen: false,
      importModal: false,
      exportModal: false,
      newCanvasModal: false,
      helpModal: false,
    };
  }

  handleCanvasNameChange(event) {
    const title = event.target.value;
    this.props.updateCanvasTitle(title);
  }

  navbarToggle() {
    this.setState({
      navbarIsOpen: !this.state.navbarIsOpen,
    });
  }

  // Modal Togglers
  openImportModal() {
    this.setState({
      importModal: !this.state.importModal,
    });
  }

  openExportModal() {
    this.setState({
      exportModal: !this.state.exportModal,
    });
  }

  openNewCanvasModal() {
    this.setState({
      newCanvasModal: !this.state.newCanvasModal,
    });
  }

  openHelpModal() {
    this.setState({
      helpModal: !this.state.helpModal,
    });
  }

  // Event Handlers
  handleChange(e) {
    // this.setState({ file: e.target.files[0] });
    const dataURL = window.URL.createObjectURL(e.target.files[0]);
    fetch(dataURL)
      .then(results => results.json())
      .then((data) => {
        this.props.loadModel(data);
        this.openImportModal();
        // const valid = this.validate(data);
        // if (valid) {
        //   this.props.loadModel(data);
        //   this.openModal();
        // } else {
        //   // @TODO: Replace with error appropriated error messages.
        //   console.log(this.validate.errors);
        // }
      });
  }

  handleDrop(event) {
    event.stopPropagation();
    event.preventDefault();

    const dt = event.dataTransfer;
    const { files } = dt;

    const dataURL = window.URL.createObjectURL(files[0]);
    fetch(dataURL)
      .then(results => results.json())
      .then((data) => {
        this.props.loadModel(data);
        this.openImportModal();
      });
  }

  handleExportCanvas(event) {
    event.preventDefault();

    const updatedCanvas = this.props.exportModel();

    const dataURL = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(updatedCanvas))}`;

    const anchor = document.createElement('a');
    anchor.setAttribute('href', dataURL);
    anchor.setAttribute('download', `${snakeCase(this.props.title)}.json`);
    anchor.click();

    this.openExportModal();
  }

  handleCreateCanvas(event) {
    event.preventDefault();

    const selectedCanvasType = event.target.select.value;

    this.props.createNewCanvas(selectedCanvasType);

    this.openNewCanvasModal();
  }

  renderHelpModal() {
    return (
      <Modal isOpen={this.state.helpModal} toggle={this.openHelpModal}>
        <ModalHeader toggle={this.openHelpModal}>{i18n.t('modal_help_title.label')}</ModalHeader>
        <ModalBody>
          <p>{i18n.t('modal_help_text.label')}</p>
        </ModalBody>
        <ModalFooter>
          <Button size="sm" color="primary" onClick={this.openHelpModal}>{i18n.t('modal_button_close.label')}</Button>
        </ModalFooter>
      </Modal>
    );
  }
  // Render Methods
  renderImportFileModal() {
    return (
      <Modal isOpen={this.state.importModal} toggle={this.openImportModal}>
        <ModalHeader toggle={this.openImportModal}>{i18n.t('modal_import_title.label')}</ModalHeader>
        <ModalBody>
          <p
            id="dropzone"
            onDragEnter={AppNav.handleDragEnter}
            onDragOver={AppNav.handleDragOver}
            onDrop={this.handleDrop}
          >
            {i18n.t('modal_import_dropzone.label')}
          </p>
          <form onSubmit={AppNav.handleFile}>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">{i18n.t('modal_import_button.label')}</span>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  accept=".json,.canvas"
                  className="custom-file-input"
                  id="customFile"
                  onChange={this.handleChange}
                />
                <Label for="customFile" className="custom-file-label">{i18n.t('modal_import_choose_file.label')}</Label>
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button size="sm" color="primary" onClick={this.openImportModal}>{i18n.t('modal_import_button.label')}</Button>
          <Button size="sm" color="secondary" onClick={this.openImportModal}>{i18n.t('modal_button_close.label')}</Button>
        </ModalFooter>
      </Modal>
    );
  }

  renderExportModal() {
    return (
      <Modal isOpen={this.state.exportModal} toggle={this.openExportModal}>
        <ModalHeader toggle={this.openExportModal}>{i18n.t('modal_export_title.label')}</ModalHeader>
        <ModalBody>
          <p>{i18n.t('modal_export_label.label')}</p>
        </ModalBody>
        <ModalFooter>
          <Button size="sm" color="primary" onClick={this.handleExportCanvas}>{i18n.t('modal_export_button.label')}</Button>
          <Button size="sm" color="secondary" onClick={this.openExportModal}>{i18n.t('modal_button_close.label')}</Button>
        </ModalFooter>
      </Modal>
    );
  }

  renderNewCanvasModal() {
    return (
      <Modal isOpen={this.state.newCanvasModal} toggle={this.openNewCanvasModal}>
        <Form onSubmit={this.handleCreateCanvas}>
          <ModalHeader toggle={this.openNewCanvasModal}>{i18n.t('modal_newcanvas_title.label')}</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label>{i18n.t('modal_newcanvas_label.label')}</Label>
              <Input type="select" name="select" id="newCanvasSelect">
                <option value="business">{i18n.t('modal_newcanvas_business_type.label')}</option>
                <option value="project">{i18n.t('modal_newcanvas_project_type.label')}</option>
                <option value="lean">{i18n.t('modal_newcanvas_lean_type.label')}</option>
                <option value="swot">{i18n.t('modal_newcanvas_swot_type.label')}</option>
                <option value="blank">{i18n.t('modal_newcanvas_blank_type.label')}</option>
              </Input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button size="sm" color="primary" type="submit">{i18n.t('modal_newcanvas_button.label')}</Button>
            <Button size="sm" color="secondary" onClick={this.openNewCanvasModal}>{i18n.t('modal_button_close.label')}</Button>
          </ModalFooter>
        </Form>
      </Modal>
    );
  }

  render() {
    return (
      <div>

        {/* Render Import File Modal Dialog */}
        { this.renderImportFileModal() }
        {/* Render Export File Modal Dialog */}
        { this.renderExportModal() }
        {/* Render New Canvas Modal Dialog */}
        { this.renderNewCanvasModal() }
        {/* Render Help Modal Dialog */}
        { this.renderHelpModal() }

        <Navbar color="light" light expand="md" fixed="top" className="border-bottom">
          <NavbarBrand href="#home"><img height="28" src={`${process.env.PUBLIC_URL}/images/LogoModelCanvasApp.svg`} alt={this.props.name} /></NavbarBrand>
          <NavbarToggler onClick={this.navbarToggle} aria-label="navbar toggler" />
          <Collapse isOpen={this.state.navbarIsOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="#"><strong><ContentEditable html={this.props.title} onChange={this.handleCanvasNameChange} disabled={false} /></strong></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={this.openNewCanvasModal} aria-label="New Canvas"><FontAwesomeIcon icon={faPlus} /> {i18n.t('navbar_newcanvas.label')}</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={this.openImportModal} aria-label="Import Canvas"><FontAwesomeIcon icon={faUpload} /> {i18n.t('navbar_import.label')}</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={this.openExportModal} aria-label="Export Canvas"><FontAwesomeIcon icon={faDownload} /> {i18n.t('navbar_export.label')}</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>{i18n.t('navbar_options.label')}</DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>{i18n.t('navbar_terms.label')}</DropdownItem>
                  <DropdownItem href="#" onClick={this.openHelpModal}>{i18n.t('navbar_help.label')}</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>{i18n.t('navbar_contribute.label')}</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
        <div className="container-fluid" style={{ paddingTop: '70px' }}>
          <Alert color={this.props.alertMessage.severity} isOpen={this.props.showAlertMessage} toggle={this.props.dismissAlert}>{this.props.alertMessage.message}</Alert>
        </div>
      </div>

    );
  }
}

AppNav.propTypes = {
  title: PropTypes.string.isRequired,
  loadModel: PropTypes.func.isRequired,
  exportModel: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  createNewCanvas: PropTypes.func.isRequired,
  updateCanvasTitle: PropTypes.func.isRequired,
};

export default AppNav;
