import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BusinessModelCanvas from './components/BusinessModelCanvas';
import * as documentUpdate from './events/documentUpdate';
import { Canvas, Color } from './common/canvas-types';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

library.add(faPlusCircle);
library.add(faTimes);
library.add(faEdit);

const baseDocument: Canvas = require('./canvas.json');

class App extends Component<any, Canvas> {
  constructor(props: any) {
    super(props);
    this.state = baseDocument;

    // documentUpdate.joinRoom('testRoom');
    // documentUpdate.subscribeToDocumentUpdate((err: Error, doc: any) => this.setState(doc));

  }
  render() {
    return (
      <div className="app">
        <aside className="sidebar">
          <h1 className="app-title">modelCanvas</h1>
          <ul className="options">
            <li className="canvas-title">Business Model Canvas</li>
            <li className="sidebar-label">Actions</li>
            <li><button><FontAwesomeIcon icon="plus-circle" /> Novo Canvas...</button></li>
            <li><button><FontAwesomeIcon icon="plus-circle" /> Importar...</button></li>
            <li><button><FontAwesomeIcon icon="plus-circle" /> Exportar...</button></li>
            <li className="sidebar-label">Other Options</li>
            <li><button><FontAwesomeIcon icon="plus-circle" /> Termos de Uso...</button></li>
            <li><button><FontAwesomeIcon icon="plus-circle" /> Ajuda...</button></li>
            <li><button><FontAwesomeIcon icon="plus-circle" /> Contribuir...</button></li>
          </ul>
        </aside>
        <main className="canvas">
          <BusinessModelCanvas document={this.state} />
        </main>
      </div>
    );
  }
}

export default App;
