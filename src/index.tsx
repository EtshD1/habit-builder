import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import reducers from "./redux/reducers";
import { Provider } from "react-redux";
import { createStore } from "redux";

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
