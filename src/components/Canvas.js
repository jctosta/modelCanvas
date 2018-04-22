import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Row from './Row';
import Column from './Column';
import Content from './Content';
import Card from './Card';

class Canvas extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            source: this.props.source,
            draggedCardId: null,
            droppedBoardId: null
        };
    }

    
    handleDragStart(ev) {
        //ev.preventDefault();
        let data = ev.target.getAttribute('data-id');
        this.setState({ draggedCardId: data });
        ev.dataTransfer.setData('text/plain', data);
        
    }

    handleCardDrop(ev) {
        //console.log(ev.target);
        let elementId = ev.target.getAttribute('data-id');
        //console.log(elementId);
        this.setState({ droppedBoardId: elementId });
        //let parentId = ev.target.parentNode.getAttribute('id');
        //console.log(parentId);
        //console.log(ev.target.textContent);
        let data = ev.dataTransfer.getData("text/plain");
        console.log(data);
        //ev.target.textContent = data;
        ev.preventDefault();
    }

    handleDropEnd(ev) {
        console.log('Finished');
        let newCards = this.state.source.cards.map((c, i) => {
            if (c.id == this.state.draggedCardId) {
                console.log("Igual");
                c.parentId = this.state.droppedBoardId;
            }
            
            return c;
        });
        this.setState({
            source: Object.assign(this.state.source, { cards: newCards })
        });
        //this.forceUpdate();
    }

    buildCards(card, idx) {
        return (<Card key={card.id} id={card.id} text={card.label} dragHandler={this.handleDragStart.bind(this)} />);
    }

    buildChild(c, idx) {

        if (c.type === "row") {
            if (c.childs !== null && c.childs !== undefined) {
                return (<Row key={idx} className={c.size} >{ c.childs.map(this.buildChild.bind(this)) }</Row>);
            } else {
                return (<Row key={idx} className={c.size}></Row>);
            }
        } else if (c.type === "column") {
            if (c.childs !== null && c.childs !== undefined) {
                return (<Column key={idx} className={c.size}>{ c.childs.map(this.buildChild.bind(this)) }</Column>);
            } else {
                return (<Column key={idx} className={c.size}></Column>);
            }
            
        } else if (c.type === "content") {
            return (
                <Content key={idx} title={c.title} className={c.color}>
                    <ul className="cards" onDragEnter={this.handleCardDrop.bind(this)} data-id={c.id} onDragOver={(ev) => ev.preventDefault()} onDragEnd={this.handleDropEnd.bind(this)}>
                        {console.log(this.state.source.cards.filter((e, i) => e.parentId === c.id) )}
                        {this.state.source.cards.filter((e, i) => e.parentId === c.id).map(this.buildCards.bind(this))}
                    </ul>
                </Content>
            );
        } else {
            return <h1>Not found</h1>;
        }
    }

    buildCanvas(source) {
        return source.childs.map(this.buildChild.bind(this));
    }

    render() {
        return (
            <div className={`${this.props.className} canvas`}>
                {(this.buildCanvas(this.props.source))}
            </div>
        );
    }
}

Canvas.propTypes = {
    source: PropTypes.object.isRequired
};

export default Canvas;