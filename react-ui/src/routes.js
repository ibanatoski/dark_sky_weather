import React from "react";
import { Route } from "react-router-dom";
import Switch from "react-router-dom/es/Switch";
import { withRouter } from "react-router-dom";

import LandingPage from "./pages/LandingPage.js";
import Forecast from "./pages/Forecast.js";

const SwitchWithRouter = withRouter(Switch);

export const routes = (
  <SwitchWithRouter>
    <Route path="/" exact render={props => <LandingPage {...props} />} />
    <Route path="/forecast" render={props => <Forecast {...props} />} />
  </SwitchWithRouter>
);
