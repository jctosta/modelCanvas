import React from 'react';
import PropTypes from 'prop-types';
import {
  Navbar,
  Collapse,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  Label,
  Input,
  FormGroup,
  Alert,
} from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';
import faUpload from '@fortawesome/fontawesome-free-solid/faUpload';
import faDownload from '@fortawesome/fontawesome-free-solid/faDownload';
import Ajv from 'ajv';
import canvasSchema from '../data/canvas-schema.json';

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

    this.ajv = new Ajv();
    this.validate = this.ajv.compile(canvasSchema);

    this.toggle = this.toggle.bind(this);
    this.openModal = this.openModal.bind(this);
    this.openExportModal = this.openExportModal.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleExportCanvas = this.handleExportCanvas.bind(this);

    this.renderImportFileModal = this.renderImportFileModal.bind(this);
    this.renderExportModal = this.renderExportModal.bind(this);

    this.openNewCanvasModal = this.openNewCanvasModal.bind(this);
    this.handleCreateCanvas = this.handleCreateCanvas.bind(this);
    this.renderNewCanvasModal = this.renderNewCanvasModal.bind(this);


    this.state = {
      isOpen: false,
      modal: false,
      exportModal: false,
      newCanvasModal: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  // Modal Togglers
  openModal() {
    this.setState({
      modal: !this.state.modal,
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

  // Event Handlers
  handleChange(e) {
    // this.setState({ file: e.target.files[0] });
    const dataURL = window.URL.createObjectURL(e.target.files[0]);
    fetch(dataURL)
      .then(results => results.json())
      .then((data) => {
        const valid = this.validate(data);
        if (valid) {
          this.props.loadModel(data);
          this.openModal();
        } else {
          // @TODO: Replace with error appropriated error messages.
          console.log(this.validate.errors);
        }
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
        this.openModal();
      });
  }

  handleExportCanvas(event) {
    event.preventDefault();

    const updatedCanvas = this.props.exportModel();

    const dataURL = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(updatedCanvas))}`;

    const anchor = document.createElement('a');
    anchor.setAttribute('href', dataURL);
    anchor.setAttribute('download', 'canvas.json');
    anchor.click();

    this.openExportModal();
  }

  handleCreateCanvas(event) {
    event.preventDefault();

    const selectedCanvasType = event.target.select.value;

    this.props.createNewCanvas(selectedCanvasType);

    this.openNewCanvasModal();
  }


  // Render Methods
  renderImportFileModal() {
    return (
      <Modal isOpen={this.state.modal} toggle={this.openModal}>
        <ModalHeader toggle={this.openModal}>Import Model</ModalHeader>
        <ModalBody>
          <p
            id="dropzone"
            onDragEnter={AppNav.handleDragEnter}
            onDragOver={AppNav.handleDragOver}
            onDrop={this.handleDrop}
          >
            Drop your model here or select one in your computer using the button bellow.
          </p>
          <form onSubmit={AppNav.handleFile}>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">Import</span>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  accept=".json,.canvas"
                  className="custom-file-input"
                  id="customFile"
                  onChange={this.handleChange}
                />
                <Label for="customFile" className="custom-file-label">Choose file...</Label>
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button size="sm" color="primary" onClick={this.openModal}>Import</Button>
          <Button size="sm" color="secondary" onClick={this.openModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }

  renderExportModal() {
    return (
      <Modal isOpen={this.state.exportModal} toggle={this.openExportModal}>
        <ModalHeader toggle={this.openExportModal}>Export Model</ModalHeader>
        <ModalBody>
          <p>Press the Export button to get a json file from your canvas.</p>
        </ModalBody>
        <ModalFooter>
          <Button size="sm" color="primary" onClick={this.handleExportCanvas}>Export</Button>
          <Button size="sm" color="secondary" onClick={this.openExportModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }

  renderNewCanvasModal() {
    return (
      <Modal isOpen={this.state.newCanvasModal} toggle={this.openNewCanvasModal}>
        <Form onSubmit={this.handleCreateCanvas}>
          <ModalHeader toggle={this.openNewCanvasModal}>Create New Canvas</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label>Please select the desired canvas type:</Label>
              <Input type="select" name="select" id="newCanvasSelect">
                <option value="business">Business Model Canvas</option>
                <option value="project">Project Model Canvas</option>
                <option value="lean">Lean Canvas</option>
                <option value="swot">Swot Canvas</option>
                <option value="blank">Blank Canvas</option>
              </Input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button size="sm" color="primary" type="submit">Create</Button>
            <Button size="sm" color="secondary" onClick={this.openNewCanvasModal}>Cancel</Button>
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

        <Navbar color="light" light expand="md" fixed="top" className="border-bottom">
          <NavbarBrand href="/"><img height="30px" src={`${process.env.PUBLIC_URL}/images/LogoModelCanvasApp.svg`} alt={this.props.name} /></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink><strong>{this.props.title}</strong></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#new" onClick={this.openNewCanvasModal} ><FontAwesomeIcon icon={faPlus} /> New Canvas...</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#open" onClick={this.openModal}><FontAwesomeIcon icon={faUpload} /> Import...</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#save" onClick={this.openExportModal}><FontAwesomeIcon icon={faDownload} /> Export...</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>Options</DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Terms of Use</DropdownItem>
                  <DropdownItem>Help</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Contribute</DropdownItem>
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
};

export default AppNav;
