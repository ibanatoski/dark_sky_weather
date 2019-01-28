import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import "css/NavBar.css";

import { fetchWeatherByZipcode, fetchWeatherByIp } from "actions/weatherData";

import { Menu, Icon, Input, Button } from "antd";

const Search = Input.Search;

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class NavBar extends Component {
  state = {
    current: "mail"
  };

  componentWillMount() {}

  componentWillUnmount() {
    //TODO: Remove event listener for escape
  }

  handleSearch = zipcode => {
    if (zipcode) this.props.history.push(`/forecast?zipcode=${zipcode}`);
  };

  handleFindWeatherByIP = () => {
    console.log("fetching forecast by IP");
    this.props.fetchWeatherByIp();
  };

  handleClick = e => {
    console.log("click ", e);
    this.setState({
      current: e.key
    });
  };

  renderNavMenu = () => {
    return (
      <Menu
        onClick={() => this.props.history.push(`/forecast`)}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="mail">Forecast</Menu.Item>
      </Menu>
    );
  };

  render() {
    console.log("render Nav");
    return (
      <div className="nav-container">
        <div className="nav-section">
          <Link
            className="nav-title"
            to={{
              pathname: "/"
            }}
          >
            Overcast
          </Link>
        </div>

        <div className="nav-section">
          <div className="nav-menu">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "30px"
              }}
            >
              <Button onClick={this.handleFindWeatherByIP}>
                <Icon type="environment" />
                Find Me
              </Button>
            </div>
            {this.renderNavMenu()}

            <div
              style={{
                display: "flex",
                alignItems: "center"
              }}
            >
              <Search
                placeholder="input zipcode"
                enterButton={<Icon type="search" />}
                size="default"
                onSearch={this.handleSearch}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      weather: state.weatherData.weather
    }),
    dispatch => ({
      fetchWeatherByZipcode: zipcode => {
        return dispatch(fetchWeatherByZipcode(zipcode));
      },
      fetchWeatherByIp: () => {
        return dispatch(fetchWeatherByIp());
      }
    })
  )(NavBar)
);
