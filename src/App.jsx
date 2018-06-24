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
    const page = window.location.hash;
    let element = (<br />);
    switch (page) {
      case '#home':
        element = (<Home title={context.getAppName()} />);
        break;
      case '#canvas':
        element = (<Canvas source={context.canvas} />);
        break;
      case '#help':
        element = (<Help />);
        break;
      default:
        element = (<Home title={context.appName} />);
        break;
    }
    return element;
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
                showAlertMessage={context.showAlertMessage}
                alertMessage={context.alertMessage}
                displayAlert={context.displayAlertMessage}
                dismissAlert={context.dismissAlertMessage}
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
