import React from "react";
import PropTypes from "prop-types";
import { Router as BrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import "css/App.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import history from "./utils/History";

const App = () => {
  return <BrowserRouter history={history}>{routes}</BrowserRouter>;
};

App.propTypes = {
  history: PropTypes.object,
  store: PropTypes.object
};

export default App;
