import React, { Component } from 'react';
import bmCanvas from './data/bm_canvas';
import Canvas from './components/Canvas';


const dataURL = 'https://gist.githubusercontent.com/jctosta/71ed43008db8e4e73774c49c30fde199/raw/f0cca33cacd6873306292476b215c44bab3cc362/canvas.json';

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      canvas: bmCanvas,
    };

  }

  componentDidMount() {
    // Load data from server
    // fetch(dataURL)
    //   .then(results => { 
    //     return results.json(); 
    //   }).then(data => { 
    //     this.setState({ 
    //       canvas: data.canvas 
    //     }); 
    //   });
  }

  render() {
    return (
      <section>
        {/* <AppNav /> */}
        {/* <Canvas value={this.state.canvas} /> */}
        <Canvas source={this.state.canvas} />
      </section>
    );
  }
}

export default App;
