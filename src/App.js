import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Canvas from './components/Canvas';
import Sidebar from './components/Sidebar';

import './style/App.scss';
// import halfmoon from 'halfmoon';
// import './App.css';
// import 'halfmoon/css/halfmoon.min.css';

function App() {

  const [canvas, setCanvas] = useState({ canvas: {
    name: 'Meu Canvas',
    type: 'business_model_canvas',
    tiles: [
        {
            id: 'BMC_PARCERIAS',
            title: 'Parcerias Principais',
            size: 'is-one-quarter',
            cards: [
                {
                    content: 'Lorem Ipsum Dolor Sit Amet'
                },
                {
                    content: 'Viajando pra Brasilia'
                }
            ]
        },
        {
            id: 'BMC_ATIVIDADES',
            title: 'Atividades Principais',
            size: 'is-one-quarter',
            cards: []
        },
        {
            id: 'BMC_RECURSOS',
            title: 'Recursos Principais',
            size: 'is-one-quarter',
            cards: []
        },
        {
            id: 'BMC_VALOR',
            title: 'Proposta de Valor',
            size: 'is-one-quarter',
            cards: []
        },
        {
            id: 'BMC_RELACIONAMENTO',
            title: 'Relacionamento com Clientes',
            size: 'is-one-third',
            cards: []
        },
        {
            id: 'BMC_CANAIS',
            title: 'Canais',
            size: 'is-one-third',
            cards: []
        },
        {
            id: 'BMC_SEGMENTOS',
            title: 'Segmentos de Clientes',
            size: 'is-one-third',
            cards: []
        },
        {
            id: 'BMC_CUSTOS',
            title: 'Estrutura de Custos',
            size: 'is-half',
            cards: []
        },
        {
            id: 'BMC_RECEITA',
            title: 'Fontes de Receita',
            size: 'is-half',
            cards: []
        }
    ]
  } });

  const addCanvasTileCard = (tileId, content) => {
    console.log('Add Card');
    canvas.canvas.tiles[tileId].cards.push({ content: content });
    setCanvas({...canvas});
  }

  const removeCanvasTileCard = (tileId, cardId) => {
    console.log('Remove Card');
    canvas.canvas.tiles[tileId].cards.splice(cardId, 1);
    setCanvas({...canvas});
  }

  const updateCanvasTileCard = (tileId, cardId, newContent) => {
    console.log('Update Card');
    canvas.canvas.tiles[tileId].cards[cardId].content = newContent;
    setCanvas({...canvas});
  }

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
              source={canvas} 
              addCard={addCanvasTileCard.bind(this)} 
              removeCard={removeCanvasTileCard.bind(this)}
              updateCard={updateCanvasTileCard.bind(this)}
            />
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
