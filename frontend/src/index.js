import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createHashHistory} from 'history'
import store from './store';
import {Provider} from 'react-redux'

const history = createHashHistory()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

export { history }

