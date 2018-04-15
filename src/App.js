import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Canvas from './components/Canvas';
import AppNav from './components/Nav';

const dataURL = 'https://gist.githubusercontent.com/jctosta/71ed43008db8e4e73774c49c30fde199/raw/a636adbb36327e912ba05e583bedc57a13dc4c6f/canvas.json';

class App extends Component {
  
  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);

    this.state = {
      canvas: undefined,
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
    let renderCanvas = undefined;
    if (this.state.canvas === undefined) {
      renderCanvas = <br />;
    } else {
      renderCanvas = <Canvas value={this.state.canvas} />;
    }
    return (
      <section className="h-100">
        <AppNav toggle={this.toggle} isOpen={this.state.isOpen} />
        <Container fluid className="h-100">
          {renderCanvas}
        </Container>        
      </section>
    );
  }
}

export default App;
