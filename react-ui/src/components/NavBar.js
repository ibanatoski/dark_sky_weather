import React, { Component } from "react";
import "css/NavBar.css";

import { Icon } from "antd";

class NavBar extends Component {
  componentWillMount() {}

  componentWillUnmount() {
    //TODO: Remove event listener for escape
  }

  render() {
    return (
      <div className="nav-container">
        <div>
          <h1>Weather</h1>
        </div>
      </div>
    );
  }
}

export default NavBar;
