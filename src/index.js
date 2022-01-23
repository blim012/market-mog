import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './stylesheets/reset.css';
import './stylesheets/searchbar.css';
import './stylesheets/itemData.css';
import './stylesheets/itemCharts.css';
import './stylesheets/itemPriceTables.css';
import './stylesheets/style.css';
import './stylesheets/itemDescription.css';
import './stylesheets/home.css';
import './stylesheets/credits.css';
import './stylesheets/logo.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
