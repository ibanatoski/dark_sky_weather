import ReactDOM from "react-dom";
import "css/index.css";
import React from "react";
import { Provider } from "react-redux";
import App from "./App";
import { AppContainer } from "react-hot-loader";
import { createBrowserHistory } from "history";
import store, { rootReducer } from "store";
export const history = createBrowserHistory();

// const persistedState = loadState();

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App history={history} />
      </Provider>
    </AppContainer>,
    document.getElementById("root")
  );
};

render();

// Hot reloading
if (module.hot) {
  // Reload components
  module.hot.accept("./App", () => {
    render();
  });

  // Reload reducers
  module.hot.accept("./reducers", () => {
    store.replaceReducer(rootReducer);
  });
}
