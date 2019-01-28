import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import Page from "./Page";
import "css/LandingPage.css";

import { fetchWeatherByZipcode } from "actions/weatherData";

import { Input, Card, Icon } from "antd";
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
    // if (zipcode) this.props.fetchWeatherByZipcode(zipcode);
    if (zipcode.length == 5)
      this.props.history.push(`/forecast?zipcode=${zipcode}`);
  };

  render() {
    return (
      <Page>
        <div className="banner">
          <div className="banner-input">
            <div style={{ textAlign: "center", margin: "40px" }}>
              <h2>
                <span style={{ color: "#6c63ff" }}>
                  <b>Overcast</b>
                </span>{" "}
                is an application driven by data, providing you with accurate
                weather predictions no matter your location!
              </h2>
              <div style={{ margin: "50px 70px" }}>
                <Search
                  placeholder="input zipcode"
                  enterButton="Search"
                  size="large"
                  onSearch={this.handleSearch}
                />
              </div>
            </div>
          </div>
          <div className="banner-image">
            <img
              alt="undraw weather"
              width="100%"
              src="./undraw_weather_d9t2.svg"
            />
          </div>
        </div>
        <div className="section" style={{ height: "500px" }}>
          <div className="feature-list-container">
            <Card
              className="feature-card"
              size="small"
              title="Temperature"
              style={{ marginRight: "5%" }}
            >
              <Icon style={{ fontSize: "32pt" }} type="cloud" />
            </Card>
            <Card
              className="feature-card"
              size="small"
              title="Temperature"
              style={{ marginRight: "5%" }}
            >
              <Icon style={{ fontSize: "32pt" }} type="cloud" />
            </Card>
            <Card
              className="feature-card"
              size="small"
              title="Temperature"
              style={{ marginRight: "5%" }}
            >
              <Icon style={{ fontSize: "32pt" }} type="cloud" />
            </Card>
            <Card
              className="feature-card"
              size="small"
              title="Temperature"
              style={{ marginRight: "5%" }}
            >
              <Icon style={{ fontSize: "32pt" }} type="cloud" />
            </Card>
          </div>
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
