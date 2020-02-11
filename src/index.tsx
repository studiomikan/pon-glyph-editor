import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./styles/app.css";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { Reducer } from "./store/reducer";
import Index from "./pages/index";
// import * as serviceWorker from './serviceWorker';

const store = createStore(
  Reducer,
  composeWithDevTools(applyMiddleware(logger))
);

const root = (
  <Provider store={store}>
    <Index />
  </Provider>
);

ReactDOM.render(root, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
