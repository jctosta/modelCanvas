import React from 'react';
import { connect } from 'react-redux';
import Navbar from './components/Navbar';
import Canvas from './components/Canvas';
import Sidebar from './components/Sidebar';

import { ADD_CARD, REMOVE_CARD, EDIT_CARD } from './redux/actionTypes';

import './style/App.scss';

const mapStateToProps = state => {
  return { canvas: state }
}

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    addCanvasTileCard: function(tileId, content) {
      dispatch({ 
        type: ADD_CARD, 
        payload: { 
          tileId, 
          body: content 
        } 
      });
    },
    removeCanvasTileCard: function(tileId, cardId) {
      dispatch({ 
        type: REMOVE_CARD,
        payload: {
          cardId,
          tileId
        }
      });
    },
    updateCanvasTileCard: function(tileId, cardId, newContent) {
      dispatch({ 
        type: EDIT_CARD,
        payload: {
          cardId,
          tileId,
          body: newContent
        }
      });
    }
  }
}

function App(props) {

  return (
    <div>
      <Navbar></Navbar>

      <div className="container-fluid is-fullhd pt-5 px-5">
        <div className="columns">
          <div className="column is-2 is-fullheight">
            <Sidebar></Sidebar>
          </div>
          <div className="column is-10 is-fullheight">
            <Canvas 
              source={props.canvas} 
              addCard={props.addCanvasTileCard.bind(this)} 
              removeCard={props.removeCanvasTileCard.bind(this)}
              updateCard={props.updateCanvasTileCard.bind(this)}
            />
          </div>
        </div>
      </div>

    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);