import React from 'react';
import PropTypes from 'prop-types';

import Content from './Content';
import Card from './Card';

import AppContext from './AppContext';

const Canvas = (props) => {
  const buildCards = (card, idx) => (
    <AppContext.Consumer key={idx}>
      {context => (
        <Card
          key={card.id}
          id={card.id}
          text={card.label}
          removeCard={context.removeCard}
          updateCardValue={context.updateCardValue}
          color={card.color}
          parentId={card.parentId}
          containers={context.canvas.containers}
        />
      )}
    </AppContext.Consumer>
  );

  const buildContainers = (c, idx) => (
    <AppContext.Consumer key={idx}>
      { context => (
        <Content
          key={idx}
          parentId={c.id}
          title={c.title}
          addCard={context.addCard}
          description={c.description}
          color={c.color}
        >
          {props.source.cards.filter(e => e.parentId === c.id).map(buildCards)}
        </Content>
        )
      }
    </AppContext.Consumer>
  );

  const buildCanvas = (source) => {
    let canvasSplit = 3;
    if (source.type === 'swot') {
      canvasSplit = 2;
    }
    const containers = [];
    let idx = 0;
    while (idx < source.containers.length) {
      if (idx % canvasSplit === 0) {
        containers.push(<div className="w-100" key={`sep-${idx}`} />);
      }
      containers.push(buildContainers(source.containers[idx], idx));
      idx += 1;
    }
    return containers;
  };

  // const buildCanvas = source => source.containers.map(buildContainers);

  return (
    <div className="container-fluid h-100" style={{ paddingTop: '0', marginBottom: '60px' }}>
      <div className="row">
        {(buildCanvas(props.source))}
      </div>
    </div>
  );
};

Canvas.propTypes = {
  source: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    containers: PropTypes.array.isRequired,
    cards: PropTypes.array.isRequired,
  }).isRequired,
};

export default Canvas;
