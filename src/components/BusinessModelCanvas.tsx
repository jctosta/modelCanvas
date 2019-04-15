import React, { Component } from "react";
import Container from './Container';
import './Canvas.css';
import './BusinessModelCanvas.css';
import { Canvas } from "../common/canvas-types";

export interface CanvasProps {
    document: Canvas,
    addItem: Function
}

class BusinessModelCanvas extends Component<CanvasProps> {

    constructor(props: CanvasProps) {
        super(props);
    }

    render() {
        let containers = this.props.document.containers.map(el => 
            <Container 
                id={el.id}
                label={el.label} 
                type={el.type} 
                helpText={el.description} 
                items={el.items} 
                addItem={this.props.addItem} />
        );
        return(
            <div className="canvas-grid">
                { containers }
            </div>
        );
    }

}

export default BusinessModelCanvas;