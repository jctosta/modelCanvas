import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';
import faUpload from '@fortawesome/fontawesome-free-solid/faUpload';
import faDownload from '@fortawesome/fontawesome-free-solid/faDownload';

import i18n from '../i18n/i18n';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIsOpen: false,
      modalNewCanvasIsOpen: false,
      modalImportIsOpen: false,
      modalExportIsOpen: false,
      importFileName: '',
    };
    // Togglers
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    // Modal Renderers
    this.renderNewCanvasModal = this.renderNewCanvasModal.bind(this);
    this.renderImportModal = this.renderImportModal.bind(this);
    this.renderExportModal = this.renderExportModal.bind(this);
    // Event Handlers
    this.handleImport = this.handleImport.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleNewCanvas = this.handleNewCanvas.bind(this);
  }

  toggleMenu() {
    this.setState({
      menuIsOpen: !this.state.menuIsOpen,
    });
  }

  toggleModal(modalName) {
    switch (modalName) {
      case 'new-canvas':
        this.setState({
          modalNewCanvasIsOpen: !this.state.modalNewCanvasIsOpen,
        });
        break;
      case 'import':
        this.setState({
          modalImportIsOpen: !this.state.modalImportIsOpen,
        });
        break;
      case 'export':
        this.setState({
          modalExportIsOpen: !this.state.modalExportIsOpen,
        });
        break;
      default:
        break;
    }
  }

  // Event Handlers
  handleImport(event) {
    event.preventDefault();
    const dataURL = window.URL.createObjectURL(event.target['file-import'].files[0]);
    fetch(dataURL)
      .then(results => results.json())
      .then((data) => {
        this.props.loadModel(data);
        this.toggleModal('import');
      });
  }

  handleFileChange(event) {
    event.preventDefault();
    if (event.target.files.length > 0) {
      this.setState({
        importFileName: event.target.files[0].name,
      });
    }
  }

  handleNewCanvas(event) {
    event.preventDefault();
    const selectedCanvasType = event.target.select.value;

    this.props.createNewCanvas(selectedCanvasType);

    this.toggleModal('new-canvas');
  }

  renderNewCanvasModal() {
    return (
      <div className={`modal ${(this.state.modalNewCanvasIsOpen ? 'is-active' : '')}`}>
        <div className="modal-background" />
        <div className="modal-card">
          <form onSubmit={this.handleNewCanvas}>
            <header className="modal-card-head">
              <p className="modal-card-title">Create New Canvas</p>
              <button className="delete" aria-label="close" onClick={() => this.toggleModal('new-canvas')} />
            </header>
            <section className="modal-card-body">
              <div className="select">
                <select name="select" id="newCanvasSelect">
                  <option value="business">Business Model Canvas</option>
                  <option value="lean">Lean Canvas</option>
                  <option value="swot">Swot Canvas</option>
                  <option value="blank">Blank Canvas</option>
                </select>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success" type="submit">Create</button>
              <button className="button" onClick={() => this.toggleModal('new-canvas')}>Cancel</button>
            </footer>
          </form>
        </div>
      </div>
    );
  }

  renderImportModal() {
    return (
      <div className={`modal ${(this.state.modalImportIsOpen ? 'is-active' : '')}`}>
        <div className="modal-background" />
        <div className="modal-card">
          <form onSubmit={this.handleImport}>
            <header className="modal-card-head">
              <p className="modal-card-title">Import File</p>
              <button className="delete" aria-label="close" onClick={() => this.toggleModal('import')} />
            </header>
            <section className="modal-card-body">
              <div className="file has-name is-centered is-boxed">
                <label className="file-label" htmlFor="file-import">
                  <input className="file-input" type="file" accept=".json,.canvas" name="file-import" id="file-import" onChange={this.handleFileChange} />
                  <span className="file-cta">
                    <span className="file-icon">
                      <FontAwesomeIcon icon={faUpload} />
                    </span>
                    <span className="file-label">
                      Choose a file…
                    </span>
                  </span>
                  <span className="file-name">
                    {this.state.importFileName}
                  </span>
                </label>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success" type="submit">Import</button>
              <button className="button" onClick={() => this.toggleModal('import')}>Cancel</button>
            </footer>
          </form>
        </div>
      </div>
    );
  }

  renderExportModal() {
    return (
      <div className={`modal ${(this.state.modalExportIsOpen ? 'is-active' : '')}`}>
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Export File</p>
            <button className="delete" aria-label="close" onClick={() => this.toggleModal('export')} />
          </header>
          <section className="modal-card-body">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus repudiandae aspernatur, molestias quas nobis similique magnam! Suscipit, obcaecati. Quas corporis possimus reiciendis non reprehenderit a eaque animi, cumque laborum omnis!</p>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success">Export</button>
            <button className="button" onClick={() => this.toggleModal('export')}>Cancel</button>
          </footer>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="section">
        {this.renderNewCanvasModal()}
        {this.renderImportModal()}
        {this.renderExportModal()}
        <nav className="navbar is-light is-fixed-top" aria-label="main navigation">
          <div className="navbar-brand">
            <a href="/" className="navbar-item">
              <img height="28" src={`${process.env.PUBLIC_URL}/images/LogoModelCanvasApp.svg`} alt={this.props.name} />
            </a>

            <a href="#" role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" onClick={this.toggleMenu}>
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </a>
          </div>
          <div className={`navbar-menu ${(this.state.menuIsOpen ? 'is-active' : '')}`}>
            <div className="navbar-start">
              <a href="#home" className="navbar-item" onClick={() => this.toggleModal('new-canvas')}>{i18n.t('navbar_newcanvas.label')}</a>
              <a href="#home" className="navbar-item" onClick={() => this.toggleModal('import')}>{i18n.t('navbar_import.label')}</a>
              <a href="#home" className="navbar-item" onClick={() => this.toggleModal('export')}>{i18n.t('navbar_export.label')}</a>
            </div>
            <div className="navbar-end">
              <a href="#help" className="navbar-item">{i18n.t('navbar_help.label')}</a>
              <a href="#settings" className="navbar-item">{i18n.t('navbar_options.label')}</a>
            </div>
          </div>
        </nav>
      </div>

    );
  }
}

Navbar.propTypes = {
  name: PropTypes.string.isRequired,
  loadModel: PropTypes.func.isRequired,
  createNewCanvas: PropTypes.func.isRequired,
};

export default Navbar;
