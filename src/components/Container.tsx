import React, { Component, Props } from "react";
import ContainerItem, { ItemProperties } from "./ContainerItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface ContainerProps {
    label: string;
    helpText: string;
    type: string;
    items?: ItemProperties[]
}

class Container extends Component<ContainerProps> {
    constructor(props: ContainerProps) {
        super(props);
    }
    render() {
        return(
            <div className={ `canvas-container ${ this.props.type }` }>
                <h2 className="container-title">{ this.props.label }</h2>
                <p className="container-help-text">{this.props.helpText}</p>
                <ul className="container-items">
                    { this.props.items ? this.props.items.map(item => <ContainerItem content={item.content} color={item.color} />) : <br /> }
                </ul>
                <div className="container-buttons">
                    <button className="container-add-button"><FontAwesomeIcon icon="plus-circle" /> Adicionar cartão...</button>
                </div>
            </div>
        );
    }
}

export default Container;