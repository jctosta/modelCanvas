import React from 'react';
import ReactDOM from 'react-dom';
import 'flexboxgrid/dist/flexboxgrid.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
