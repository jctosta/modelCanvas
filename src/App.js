import React, { Component } from 'react';
import Canvas from './components/CanvasAlt';
import AppNav from './components/Nav';
import blank_canvas from './data/blank_canvas.json';

const dataURL = 'https://gist.githubusercontent.com/jctosta/71ed43008db8e4e73774c49c30fde199/raw/f0cca33cacd6873306292476b215c44bab3cc362/canvas.json';

class App extends Component {
  
  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);

    this.state = {
      canvas: blank_canvas.canvas,
      isOpen: false
    };

  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentDidMount() {
    // Load data from server
    fetch(dataURL)
      .then(results => { 
        return results.json(); 
      }).then(data => { 
        this.setState({ 
          canvas: data.canvas 
        }); 
      });
  }

  render() {
    console.log(blank_canvas);
    return (
      <section>
        <AppNav />
        <Canvas value={this.state.canvas} />
      </section>
    );
  }
}

export default App;
