import React, { Component, useState } from 'react';
import logo from './logo.svg';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import './App.css';
import BusinessModelCanvas from './components/BusinessModelCanvas';
import * as documentUpdate from './events/documentUpdate';
import { Canvas, Color, ContainerItem } from './common/canvas-types';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Button, Navbar, NavbarGroup, NavbarHeading, NavbarDivider } from '@blueprintjs/core';
import { CanvasManager } from './common/CanvasManager';

import * as uniqid from 'uniqid';
import { render } from 'react-dom';

const baseDocument: Canvas = require('./canvas.json');

const App = () => {
  
  const [canvas, setCanvas] = useState(baseDocument);
  const canvasManager = new CanvasManager(baseDocument);

  const addItem = (itemContent: string, parentContainer: string) => {
    let containerItem: ContainerItem = {
      id: uniqid.default(),
      content: itemContent,
      color: Color.blue
    };

    canvasManager.insertContainerItem(containerItem, parentContainer);
    
    setCanvas(canvasManager.canvas);
  }

  const updateItem = (itemContent: string, itemId: string, parentContainer: string) => {
    let containerItem: ContainerItem | undefined = canvasManager.findContainerItemById(itemId, parentContainer);
    if (containerItem) {
      containerItem.content = itemContent;
      canvasManager.insertContainerItem(containerItem, parentContainer);
      setCanvas(canvasManager.canvas);
    }

  }

  return (
    <div className="app">
      <Navbar>
        <NavbarGroup align="left">
          <NavbarHeading>modelCanvas.app</NavbarHeading>
          <NavbarDivider />
          <Button className="bp3-minimal" icon="home" text="Home" />
          <Button className="bp3-minimal" icon="document" text="Documents" />
          <NavbarDivider />
        </NavbarGroup>
        <NavbarGroup align="right">
          <NavbarDivider />
          <Button className="bp3-minimal" icon="user" />
          <Button className="bp3-minimal" icon="notifications" />
          <Button className="bp3-minimal" icon="cog" />
        </NavbarGroup>
      </Navbar>
      <main className="canvas">
        <BusinessModelCanvas document={canvas} addItem={addItem} />
      </main>
    </div>
  );
};

export default App;
