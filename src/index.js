import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './style/cosmo.css';
import './style/index.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
