import React, { Component } from 'react';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';
import AppContext from './AppContext';

import leanCanvas from '../templates/lean.json';
import businessCanvas from '../templates/business.json';
import swotCanvas from '../templates/swot.json';
import blankCanvas from '../templates/blank.json';
import leanCanvasPt from '../templates/lean.pt.json';
import businessCanvasPt from '../templates/business.pt.json';
import swotCanvasPt from '../templates/swot.pt.json';
import blankCanvasPt from '../templates/blank.pt.json';

class AppProvider extends Component {
  static loadStorage() {
    let cachedData = window.localStorage.canvas;
    if (!cachedData) {
      cachedData = {
        title: 'Blank Canvas',
        type: '',
        containers: [],
        cards: [],
        isEmpty: true,
      };
      window.localStorage.setItem('canvas', JSON.stringify(cachedData));
    } else {
      cachedData = JSON.parse(cachedData);
    }
    return cachedData;
  }

  static isStorageEmpty() {
    const cachedData = window.localStorage.canvas;
    if (cachedData) {
      return false;
    }
    return true;
  }

  constructor(props) {
    super(props);

    this.state = {
      // PROPERTIES
      appName: 'modelCanvas.app',
      canvas: {
        title: 'Blank Canvas',
        type: '',
        containers: [],
        cards: [],
        isEmpty: true,
      },
      language: 'pt',
      canvasModified: false,
      getAppName: this.getAppName.bind(this),
      addCard: this.addCard.bind(this),
      updateCanvasTitle: this.updateCanvasTitle.bind(this),
      loadModel: this.loadModel.bind(this),
      exportModel: this.exportModel.bind(this),
      updateCardValue: this.updateCardValue.bind(this),
      updateStorage: this.updateStorage.bind(this),
      removeCard: this.removeCard.bind(this),
      createNewCanvas: this.createNewCanvas.bind(this),
      toggleModified: this.toggleModified.bind(this),
      cleanStorage: this.cleanStorage.bind(this),
    };
  }

  componentWillMount() {
    if (AppProvider.isStorageEmpty()) {
      AppProvider.setCurrentPage('home');
    } else {
      this.setState({
        canvas: AppProvider.loadStorage(),
      });
      AppProvider.setCurrentPage('canvas');
    }
    // if (this.state.canvas.isEmpty) {
    //   this.setCurrentPage('home');
    // } else {
    //   this.setCurrentPage('canvas');
    // }
  }

  static setCurrentPage(pageName) {
    window.location.hash = `#${pageName}`;
  }

  getAppName() {
    return this.state.appName;
  }

  toggleModified() {
    this.setState({
      canvasModified: true,
    });
  }

  createNewCanvas(canvasType) {
    switch (canvasType) {
      case 'business':
        if (this.state.language === 'pt') {
          this.setState({
            canvas: businessCanvasPt,
          });
        } else {
          this.setState({
            canvas: businessCanvas,
          });
        }
        break;
      case 'project':
        break;
      case 'lean':
        if (this.state.language === 'pt') {
          this.setState({
            canvas: leanCanvasPt,
          });
        } else {
          this.setState({
            canvas: leanCanvas,
          });
        }
        break;
      case 'swot':
        if (this.state.language === 'pt') {
          this.setState({
            canvas: swotCanvasPt,
          });
        } else {
          this.setState({
            canvas: swotCanvas,
          });
        }
        break;
      default:
        if (this.state.language === 'pt') {
          this.setState({
            canvas: blankCanvasPt,
          });
        } else {
          this.setState({
            canvas: blankCanvas,
          });
        }
        break;
    }
    AppProvider.setCurrentPage('canvas');
    this.toggleModified();
  }

  addCard(parentId, label, color) {
    const { cards } = this.state.canvas;
    cards.push({
      parentId,
      label,
      color,
      id: nanoid(),
    });
    // Updating canvas object values
    const newCanvas = Object.assign({ cards }, this.state.canvas);
    // Updating global state
    this.setState({
      canvas: newCanvas,
    });
    // Persisting data on storage
    this.toggleModified();
  }

  updateCanvasTitle(title) {
    const { canvas } = this.state;
    canvas.title = title;
    this.setState({
      canvas,
    });
    this.toggleModified();
  }

  loadModel(canvas) {
    this.setState({
      canvas,
    });
    this.updateStorage();
    // this.toggleModified();
    AppProvider.setCurrentPage('canvas');
  }

  exportModel() {
    return this.state.canvas;
  }

  updateCardValue(cardId, cardValue, cardColor, cardParent) {
    // Atualizando a lista de cards
    const cards = this.state.canvas.cards.map((el) => {
      const tempElement = el;
      if (el.id === cardId) {
        tempElement.label = cardValue;
        tempElement.color = cardColor;
        if (cardParent) {
          tempElement.parentId = Number.parseInt(cardParent, 10);
        }
      }
      return tempElement;
    });
    // Atualizando o objeto canvas
    const newCanvas = Object.assign({ cards }, this.state.canvas);
    // Atualizando o estado global
    this.setState({
      canvas: newCanvas,
    });
    this.toggleModified();
  }

  updateStorage() {
    localStorage.setItem('canvas', JSON.stringify(this.state.canvas));
    this.setState({
      canvasModified: false,
    });
  }

  cleanStorage() {
    localStorage.clear();
    this.toggleModified();
  }

  removeCard(cardId) {
    const cards = this.state.canvas.cards.filter(el => (el.id !== cardId));
    // Atualizando o objeto canvas
    const newCanvas = this.state.canvas;
    newCanvas.cards = cards;
    // Atualizando o estado global
    this.setState({
      canvas: newCanvas,
    });
    this.toggleModified();
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

AppProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppProvider;
