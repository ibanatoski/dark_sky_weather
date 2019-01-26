import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import Page from "./Page";
import "css/LandingPage.css";

import { fetchWeatherByZipcode } from "actions/weatherData";

import { Form, Input, Button } from "antd";
const Search = Input.Search;

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: 0,
      weather: null
    };
  }

  componentDidMount() {
    //this.props.fetchWeatherByZipcode("01754");
  }

  componentDidUpdate(prevProps, prevState) {}

  handleSearch = zipcode => {
    console.log(zipcode);
    if (zipcode) this.props.fetchWeatherByZipcode(zipcode);
  };

  render() {
    return (
      <Page>
        <div className="banner">
          <div className="banner-input">
            <Search
              placeholder="input zipcode"
              enterButton="Search"
              size="large"
              onSearch={this.handleSearch}
            />
            <h1>hello</h1>
          </div>
          <div className="banner-image" />
        </div>
      </Page>
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
  )(LandingPage)
);
