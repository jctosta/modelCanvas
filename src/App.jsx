import React, { Component } from 'react';
import Canvas from './components/Canvas';
import AppNav from './components/AppNav';
import AppContext from './components/AppContext';
import AppProvider from './components/AppProvider';
import Home from './components/Home';

class App extends Component {
  static renderCanvas(name, canvas) {
    if (canvas.isEmpty) {
      return <Home title={name} />;
    }
    return <Canvas source={canvas} />;
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
                createNewCanvas={context.createNewCanvas}
                showAlertMessage={context.showAlertMessage}
                alertMessage={context.alertMessage}
                displayAlert={context.displayAlertMessage}
                dismissAlert={context.dismissAlertMessage}
              />)
            }
          </AppContext.Consumer>
          <AppContext.Consumer>
            {context => App.renderCanvas(context.getAppName(), context.canvas)}
          </AppContext.Consumer>
        </section>
      </AppProvider>
    );
  }
}

export default App;
