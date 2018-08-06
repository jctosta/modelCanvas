import React, { Component } from 'react';
import Canvas from './components/Canvas';
import AppNav from './components/AppNav';
import AppFooter from './components/AppFooter';
import AppContext from './components/AppContext';
import AppProvider from './components/AppProvider';
import Home from './components/Home';
import Help from './components/Help';

class App extends Component {
  static renderPage(context) {
    if (!context.canvas.isEmpty) {
      return <Canvas source={context.canvas} />;
    }
    return <Home title={context.getAppName()} />;
  }

  render() {
    return (
      <AppProvider>
        <section className="h-100 home-background">
          <AppContext.Consumer>
            {context =>
              (<AppNav
                name={context.appName}
                loadModel={context.loadModel}
                exportModel={context.exportModel}
                title={context.canvas.title}
                updateCanvasTitle={context.updateCanvasTitle}
                createNewCanvas={context.createNewCanvas}
                documentView={context.getMustacheView}
              />)
            }
          </AppContext.Consumer>
          <AppContext.Consumer>
            {context => App.renderPage(context)}
          </AppContext.Consumer>
          <AppContext.Consumer>
            { context => (
              <AppFooter
                canvasModified={context.canvasModified}
                updateStorage={context.updateStorage}
                cleanStorage={context.cleanStorage}
                isStorageEmpty={AppProvider.isStorageEmpty}
              />
            ) }
          </AppContext.Consumer>
        </section>
      </AppProvider>
    );
  }
}

export default App;
