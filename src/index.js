import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

// components
import App from './components/App';

// styles
import './styles/main.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
