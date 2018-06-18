import React, { Component } from 'react';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';
import AppContext from './AppContext';
//import blankCanvas from '../data/blank_canvas.json';

import leanCanvas from '../templates/lean.json';
import businessCanvas from '../templates/business.json';
import swotCanvas from '../templates/swot.json';
import blankCanvas from '../templates/blank.json';

class AppProvider extends Component {
  static loadStorage() {
    let cachedData = JSON.parse(sessionStorage.getItem('canvas'));
    if (!cachedData) {
      cachedData = {
        title: 'Blank Canvas',
        type: '',
        containers: [],
        cards: [],
        isEmpty: true,
      };
      sessionStorage.setItem('canvas', JSON.stringify(cachedData));
    }
    return cachedData;
  }

  static isStorageEmpty() {
    const cachedData = JSON.parse(sessionStorage.getItem('canvas'));
    if (cachedData) {
      return true;
    }
    return false;
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
      alertMessage: {},
      showAlertMessage: false,
      getAppName: this.getAppName.bind(this),
      addCard: this.addCard.bind(this),
      updateCanvasTitle: this.updateCanvasTitle.bind(this),
      loadModel: this.loadModel.bind(this),
      exportModel: this.exportModel.bind(this),
      updateCardValue: this.updateCardValue.bind(this),
      updateStorage: this.updateStorage.bind(this),
      removeCard: this.removeCard.bind(this),
      createNewCanvas: this.createNewCanvas.bind(this),
      dismissAlertMessage: this.dismissAlertMessage.bind(this),
      displayAlertMessage: this.displayAlertMessage.bind(this),
    };
  }

  componentWillMount() {
    if (AppProvider.isStorageEmpty) {
      this.setState({
        canvas: AppProvider.loadStorage(),
      });
    } else {
      this.setState({
        canvas: {
          title: 'Blank Canvas',
          type: '',
          containers: [],
          cards: [],
          isEmpty: true,
        },
      });
    }
  }


  getAppName() {
    return this.state.appName;
  }

  displayAlertMessage(message, severity) {
    this.setState({
      alertMessage: {
        message,
        severity,
      },
      showAlertMessage: true,
    });
  }

  dismissAlertMessage() {
    this.setState({
      showAlertMessage: false,
      alertMessage: {},
    });
  }

  createNewCanvas(canvasType) {
    switch (canvasType) {
      case 'business':
        this.setState({
          canvas: businessCanvas,
        });
        break;
      case 'project':
        break;
      case 'lean':
        this.setState({
          canvas: leanCanvas,
        });
        break;
      case 'swot':
        this.setState({
          canvas: swotCanvas,
        });
        break;
      default:
        this.setState({
          canvas: blankCanvas,
        });
        break;
    }
    this.state.updateStorage();
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
    this.state.updateStorage();
    this.state.displayAlertMessage('Card successfully created.', 'success');
  }

  updateCanvasTitle(newTitle) {
    const newCanvas = Object.assign({ title: newTitle }, this.state.canvas);
    this.setState({
      canvas: newCanvas,
    });
    this.state.updateStorage();
  }

  loadModel(canvas) {
    this.setState({
      canvas,
    });
    this.state.updateStorage();
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
    this.state.updateStorage();
    this.state.displayAlertMessage('Card successfully updated.', 'success');
  }

  updateStorage() {
    sessionStorage.setItem('canvas', JSON.stringify(this.state.canvas));
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
    this.state.updateStorage();
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
