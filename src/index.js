import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './stylesheets/reset.css';
import './stylesheets/searchbar.css';
import './stylesheets/itemData.css';
import './stylesheets/itemCharts.css';
import './stylesheets/style.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
