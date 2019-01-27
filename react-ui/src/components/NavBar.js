import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import "css/NavBar.css";

import { fetchWeatherByZipcode } from "actions/weatherData";

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
    console.log(zipcode);
    if (zipcode) this.props.fetchWeatherByZipcode(zipcode);
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
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="mail">Week</Menu.Item>
        <Menu.Item key="app">Hourly</Menu.Item>
        <SubMenu
          title={<span className="submenu-title-wrapper">Detailed Day</span>}
        >
          <MenuItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
      </Menu>
    );
  };

  render() {
    return (
      <div className="nav-container">
        <div className="nav-section">
          <span className="nav-title">Overcast</span>
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
              <Button>
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
      }
    })
  )(NavBar)
);
