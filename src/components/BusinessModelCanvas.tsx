import React, { Component } from "react";
import Container from './Container';
import './Canvas.css';
import './BusinessModelCanvas.css';
import { Canvas } from "../common/canvas-types";

export interface CanvasProps {
    document: Canvas
}

class BusinessModelCanvas extends Component<CanvasProps> {

    constructor(props: CanvasProps) {
        super(props);
    }

    render() {
        let containers = this.props.document.containers.map(el => <Container label={el.label} type={el.type} helpText={el.description} items={el.items} />);
        return(
            <div className="canvas-grid">
                { containers }
                {/* <Container label="Partners" type="partners-container" helpText="Lorem Ipsum Dolor Sit Amet..." items={[
                    { content: 'Teste', color: 'blue' },
                    { content: 'Lorem Ipsum', color: 'red' }
                ]} />
                <Container label="Activities" type="activities-container"  helpText="Lorem Ipsum Dolor Sit Amet..." items={[]} />
                <Container label="Propositions" type="propositions-container"  helpText="Lorem Ipsum Dolor Sit Amet..." items={[]} />
                <Container label="Relationships" type="relationships-container"  helpText="Lorem Ipsum Dolor Sit Amet..." items={[]} />
                <Container label="Segments" type="segments-container"  helpText="Lorem Ipsum Dolor Sit Amet..." items={[]} />
                <Container label="Resources" type="resources-container"  helpText="Lorem Ipsum Dolor Sit Amet..." items={[]} />
                <Container label="Channels" type="channels-container"  helpText="Lorem Ipsum Dolor Sit Amet..." items={[]} />
                <Container label="Cost" type="cost-container"  helpText="Lorem Ipsum Dolor Sit Amet..." items={[]} />
                <Container label="Revenue" type="revenue-container"  helpText="Lorem Ipsum Dolor Sit Amet..." items={[]} /> */}
                {/* <div className="canvas-container partners-container">Teste</div>
                <div className="canvas-container activities-container">Teste</div>
                <div className="canvas-container propositions-container">Teste</div>
                <div className="canvas-container relationships-container">Teste</div>
                <div className="canvas-container segments-container">Teste</div>
                <div className="canvas-container resources-container">Teste</div>
                <div className="canvas-container channels-container">Teste</div>
                <div className="canvas-container cost-container">Teste</div>
                <div className="canvas-container revenue-container">Teste</div> */}
            </div>
        );
    }

}

export default BusinessModelCanvas;