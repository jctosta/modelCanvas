import React, { Component, useState } from "react";
import { Tag, Popover, TextArea, Button, Intent } from "@blueprintjs/core";
import { isOpen } from "@blueprintjs/core/lib/esm/components/context-menu/contextMenu";

export interface ItemProperties {
    id: string;
    content: string;
    color: string;
}

class ContainerItem extends Component<ItemProperties> {
    
    private itemTextRef: any = React.createRef<any>();

    constructor(props: ItemProperties) {
        super(props);
        // this.isOpen = false;
    }

    updateItem() {
        let updatedText = this.itemTextRef.current.value;
        let itemId = this.props.id;
        // this.props.updateItem()
    }

    render() {
        let isOpen = false;
        return(
            <Popover position="auto">
                {/* <Tag multiline={true} large={true} fill={false} onRemove={(e) => {}} interactive={ true } style={{ marginBottom: '5px' }}>{this.props.content}</Tag> */}
                <span className={`container-item item-${this.props.color}`}>{this.props.content} <Button minimal={true} small={true} intent={Intent.NONE} icon="cross" /></span>
                <div className="container-form">
                    {/* <h4>Popover title</h4> */}
                    <TextArea growVertically={true} fill={true} style={{ marginBottom: '10px' }} inputRef={this.itemTextRef} value={this.props.content} />
                    <Button minimal={true} rightIcon="confirm" intent={Intent.PRIMARY}>Salvar</Button>
                    <Button className="bp3-popover-dismiss" minimal={true} rightIcon="remove" intent={Intent.NONE}>Cancelar</Button>
                </div> 
            </Popover>
        );
    }
}

export default ContainerItem;