import React, { Component } from "react";

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
            <li className={`container-item item-${this.props.color}`}>{this.props.content}</li>
        );
    }
}

export default ContainerItem;