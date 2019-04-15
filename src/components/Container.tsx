import React, { Component, Props, RefObject, TextareaHTMLAttributes } from "react";
import ContainerItem, { ItemProperties } from "./ContainerItem";
import { Card, Elevation, Button, Popover, Intent, TextArea, Classes, ButtonGroup } from "@blueprintjs/core";

export interface ContainerProps {
    id: string,
    label: string;
    helpText: string;
    type: string;
    items: ItemProperties[],
    addItem: Function
}

class Container extends Component<ContainerProps> {

    private itemTextRef: any = React.createRef<any>();

    constructor(props: ContainerProps) {
        super(props);
        this.createNewItem = this.createNewItem.bind(this);
    }

    createNewItem() {
        this.props.addItem(this.itemTextRef.current.value, this.props.id);
    }

    render() {
        return(
            <Card interactive={true} elevation={Elevation.ONE} className={ `canvas-container ${ this.props.type }` }>
                <h2 className="container-title">{ this.props.label }</h2>
                <div className="container-items">
                    { this.props.items ? this.props.items.map(item => <ContainerItem content={item.content} color={item.color} id={item.id} />) : <br /> }
                </div>
                <Popover position="auto-end">
                    <ButtonGroup minimal={true}>
                        <Button alignText="right" rightIcon="add-to-artifact">Adicionar Cartão...</Button>
                    </ButtonGroup>
                    <div className="container-form">
                        <h4>Adicionar Item</h4>
                        <TextArea growVertically={true} fill={true} style={{ marginBottom: '10px' }} inputRef={this.itemTextRef} />
                        <Button minimal={true} rightIcon="confirm" intent={Intent.PRIMARY} onClick={this.createNewItem} className={Classes.POPOVER_DISMISS}>Salvar</Button>
                        <Button className="bp3-popover-dismiss" minimal={true} rightIcon="remove" intent={Intent.NONE}>Cancelar</Button>
                    </div>    
                </Popover>
                
            </Card>
            // <div className={ `canvas-container ${ this.props.type }` }>
            //     <h2 className="container-title">{ this.props.label }</h2>
            //     <p className="container-help-text">{this.props.helpText}</p>
            //     <ul className="container-items">
            //         { this.props.items ? this.props.items.map(item => <ContainerItem content={item.content} color={item.color} />) : <br /> }
            //     </ul>
            //     <div className="container-buttons">
            //         <button className="container-add-button"><FontAwesomeIcon icon="plus-circle" /> Adicionar cartão...</button>
            //     </div>
            // </div>
        );
    }
}

export default Container;