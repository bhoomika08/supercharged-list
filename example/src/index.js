import React from 'react';
import ReactDOM from 'react-dom';
import appStore from "./app/reducers/store";
import App from "./App";
import "./App.scss"
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={appStore}>
    <App />
  </Provider>
  ,document.getElementById('root'));