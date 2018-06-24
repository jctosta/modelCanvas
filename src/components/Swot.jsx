import React from 'react';
import PropTypes from 'prop-types';

// const buildContainers = (c, idx) => (
//   <AppContext.Consumer key={idx}>
//     { context => (
//       <Content
//         key={idx}
//         parentId={c.id}
//         title={c.title}
//         addCard={context.addCard}
//         description={c.description}
//         color={c.color}
//       >
//         {props.source.cards.filter(e => e.parentId === c.id).map(buildCards)}
//       </Content>
//       )
//     }
//   </AppContext.Consumer>
// );

const renderChildTiles = c => (
  <div className="tile is-3 is-child is-vertical" key={c.id}>
    <p className="title">{c.title}</p>
    <p className="subtitle">{c.description}</p>
  </div>
);

const renderTiles = canvas => canvas.containers.map(renderChildTiles);

const Swot = props => {
  return (
    <div className="tile is-ancestor">
    {renderTiles(props.canvas)}
  </div>
  );
};

Swot.propTypes = {

};

export default Swot;
