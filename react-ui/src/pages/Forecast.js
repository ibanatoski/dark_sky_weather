import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import queryString from "query-string";
import Page from "./Page";
import "css/Forecast.css";

import DayCard from "components/DayCard";

import { fetchWeatherByZipcode } from "actions/weatherData";

import { Input, Card, Icon, List } from "antd";

const Search = Input.Search;
const { Meta } = Card;

class Forecast extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const parsed = queryString.parse(this.props.location.search);
    this.handleSearch(parsed.zipcode);
  }

  componentDidUpdate(prevProps, prevState) {}

  handleSearch = zipcode => {
    console.log(zipcode);
    if (zipcode) this.props.fetchWeatherByZipcode(zipcode);
  };

  renderCardSummary = current => {
    return (
      <Card
        style={{ width: 300 }}
        cover={<img alt="summary-svg" src={`./svgs/${current.icon}.svg`} />}
        actions={[
          <div className="card-action" style={{ display: "flex" }}>
            Feels Like:<span>{current.apparentTemperature}F</span>
          </div>,
          <div>
            UV Index: <span>{current.uvIndex}</span>
          </div>,
          <div>Humidity:{current.humidity}</div>
        ]}
      >
        <Meta title={current.summary} description="This is the description" />
      </Card>
    );
  };

  renderTodaySummary = (current, daily) => {
    return (
      <div className="day-summary">
        <div className="day-summary-top">
          <div className="icon-container">
            <img alt="summary-svg" src={`./svgs/${current.icon}.svg`} />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className="forecast-title">
              {Math.round(current.temperature) + " " + current.summary}
            </span>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="extra-detail">
                Feels Like:<span>{current.apparentTemperature}F</span>
              </div>
              <div className="extra-detail">
                High:<span>{current.uvIndex}</span>
              </div>
              <div className="extra-detail">
                Low:<span>{current.windSpeed}mph</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center", margin: "25px 50px" }}>
          <span style={{ fontSize: "18pt" }}>{daily.summary}</span>
        </div>
        <div className="day-summary-bottom">
          <div className="bottom-item">
            <span
              style={{
                fontWeight: "bold",
                fontSize: "1.2em",
                marginRight: "5px"
              }}
            >
              Wind:{" "}
            </span>
            {current.windSpeed}mph{" "}
            <Icon
              type="arrow-up"
              style={{ transform: `rotate(${current.windBearing}deg)` }}
            />
          </div>
          <div className="bottom-item">
            <span
              style={{
                fontWeight: "bold",
                fontSize: "1.2em",
                marginRight: "5px"
              }}
            >
              Humidity:{" "}
            </span>
            {Math.round(current.humidity)}%
          </div>
          <div className="bottom-item">
            <span
              style={{
                fontWeight: "bold",
                fontSize: "1.2em",
                marginRight: "5px"
              }}
            >
              UV Index:{" "}
            </span>
            {Math.round(current.uvIndex)}
          </div>
          <div className="bottom-item">
            <span
              style={{
                fontWeight: "bold",
                fontSize: "1.2em",
                marginRight: "5px"
              }}
            >
              Dew Pt:{" "}
            </span>

            {Math.round(current.dewPoint)}
          </div>
          <div className="bottom-item">
            <span
              style={{
                fontWeight: "bold",
                fontSize: "1.2em",
                marginRight: "5px"
              }}
            >
              Visibility:{" "}
            </span>
            {Math.round(current.visibility)}mi
          </div>
          <div className="bottom-item">
            <span
              style={{
                fontWeight: "bold",
                fontSize: "1.2em",
                marginRight: "5px"
              }}
            >
              Pressure:{" "}
            </span>
            {Math.round(current.pressure)}mb
          </div>
        </div>
      </div>
    );
  };

  render;

  renderDayListItem = (data, i) => {
    return (
      <List.Item key={i}>
        <DayCard data={data} />
      </List.Item>
    );
  };

  renderWeekSummary = daily => {
    return (
      <List style={{ width: "100%" }}>
        {daily.data
          ? daily.data.map((day, i) => this.renderDayListItem(day, i))
          : null}
      </List>
    );
  };

  render() {
    console.log("render", this.props.locationData);
    console.log("render", this.props.forecastData);
    var current = this.props.forecastData
      ? this.props.forecastData.currently
      : null;

    var daily = this.props.forecastData ? this.props.forecastData.daily : null;
    console.log("daily", daily);
    return (
      <Page>
        <div className="forecast-banner">
          {current ? this.renderTodaySummary(current, daily) : null}
        </div>
        <div className="page-content">
          {current ? this.renderWeekSummary(daily) : null}
        </div>
      </Page>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      locationData: state.weatherData.geoLoc,
      forecastData: state.weatherData.weather
    }),
    dispatch => ({
      fetchWeatherByZipcode: zipcode => {
        return dispatch(fetchWeatherByZipcode(zipcode));
      }
    })
  )(Forecast)
);
