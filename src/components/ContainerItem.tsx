import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface ItemProperties {
    content: string;
    color: string;
}

class ContainerItem extends Component<ItemProperties> {
    constructor(props: ItemProperties) {
        super(props);
    }

    render() {
        return(
            <li className={`container-item item-${this.props.color}`}>
                <span className="item-content">{this.props.content}</span>
                <span className="item-buttons">
                    <button className="item-button"><FontAwesomeIcon icon="edit" /></button>
                    <button className="item-button"><FontAwesomeIcon icon="times" /></button>
                </span>
            </li>
        );
    }
}

export default ContainerItem;