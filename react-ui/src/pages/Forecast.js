import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import queryString from "query-string";
import Page from "./Page";
import "css/Forecast.css";

import DayCard from "components/DayCard";
import DayCharts from "components/DayCharts";

import {
  fetchWeatherByZipcode,
  fetchLocationByIP,
  fetchWeatherByIp,
  fetchHourlyWeatherByLocationTime
} from "actions/weatherData";
import { formatDate } from "utils/formatDate.js";

import { Input, Card, Icon, List, Button } from "antd";

const Search = Input.Search;
const { Meta } = Card;

class Forecast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: null,
      width: 0,
      height: 0,
      render: ""
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    var parsed = queryString.parse(this.props.location.search);
    if (!parsed.zipcode) {
      parsed = { zipcode: 20001 }; // default to washington dc
      this.props.history.push(`/forecast?zipcode=${parsed.zipcode}`);
    }
    this.setState({ zipcode: parsed.zipcode });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    if (window.innerWidth < 600) {
      this.setState({
        render: "small",
        width: window.innerWidth,
        height: window.innerHeight
      });
    } else {
      this.setState({
        render: "",
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const parsed = queryString.parse(this.props.location.search);
    if (prevState.zipcode !== parsed.zipcode) {
      this.props.fetchWeatherByZipcode(parsed.zipcode);
      this.setState({
        zipcode: parsed.zipcode
      });
    }
  }

  handleFindWeatherByIP = () => {
    this.props.fetchWeatherByIp();
  };

  handleSearch = zipcode => {
    if (this.state.zipcode !== zipcode) {
      this.props.history.push(`/forecast?zipcode=${zipcode}`);
    }
  };

  renderCardSummary = current => {
    return (
      <Card
        style={{ width: 300 }}
        cover={<img alt="summary-svg" src={`./svgs/${current.icon}.svg`} />}
        actions={[
          <div className="card-action" style={{ display: "flex" }}>
            Feels Like:<span>{current.apparentTemperature + "°"}F</span>
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
        <div style={{ fontSize: "16pt", fontWeight: "bold" }}>
          {formatDate(new Date(current.time * 1000))}
        </div>
        <div className={`day-summary-top`}>
          <div className="icon-container">
            <img alt="summary-svg" src={`./svgs/${current.icon}.svg`} />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className="forecast-title">
              {Math.round(current.temperature) + "°F" + " " + current.summary}
            </span>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="extra-detail">
                Feels Like:
                <span>{Math.round(current.apparentTemperature) + "°"}F</span>
              </div>
              <div className="extra-detail">
                High:<span>{current.uvIndex}</span>
              </div>
              <div className="extra-detail">
                Low:<span>{Math.round(current.windSpeed)}mph</span>
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

  renderDayListItem = (data, i) => {
    return (
      <List.Item key={i}>
        <DayCard
          data={data}
          render={this.state.render}
          latitude={this.props.forecastData.latitude}
          longitude={this.props.forecastData.longitude}
          hourly={this.props.week[`${data.time}`]}
          loadMore={() =>
            this.props.fetchHourlyWeatherByLocationTime(
              this.props.forecastData.latitude,
              this.props.forecastData.longitude,
              data.time
            )
          }
        />
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

  renderSearchLocation = loc => {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>{loc ? loc.formatted_address : "Enter your zipcode here"}</h1>
        <div
          style={{
            display: "flex",
            flexDirection: this.state.render == "" ? "row" : "column",
            justifyContent: "center",
            width: "100%"
          }}
        >
          <Search
            placeholder="input zipcode"
            enterButton="Search"
            size="large"
            style={{ width: "300px" }}
            onSearch={this.handleSearch}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: this.state.render == "" ? "0" : "30px",
              marginLeft: this.state.render == "" ? "30px" : "0px"
            }}
          >
            <Button onClick={() => this.props.fetchWeatherByIP()}>
              <Icon type="environment" />
              Find Me
            </Button>
          </div>
        </div>
      </div>
    );
  };

  render() {
    var locationData = this.props.locationData;
    var current = this.props.forecastData
      ? this.props.forecastData.currently
      : null;

    var daily = this.props.forecastData ? this.props.forecastData.daily : null;
    var hourly = this.props.forecastData
      ? this.props.forecastData.hourly
      : null;
    return (
      <Page>
        <div className="forecast-banner">
          <div className="forecast-banner-search">
            {this.renderSearchLocation(locationData)}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {current ? this.renderTodaySummary(current, daily) : null}
          </div>
        </div>
        <div className="page-content">
          {hourly ? (
            <div
              className="today-detail"
              onClick={() =>
                this.setState({
                  displayTodayDetail: !this.state.displayTodayDetail
                })
              }
            >
              <div className="today-in-detail-top-bar">
                <h1>Today In Detail</h1>
                {this.state.displayTodayDetail ? (
                  <Icon
                    style={{ fontSize: "3em" }}
                    type="down-circle"
                    theme="twoTone"
                    twoToneColor="#6C63FF"
                  />
                ) : (
                  <Icon
                    style={{ fontSize: "3em" }}
                    type="right-circle"
                    theme="twoTone"
                    twoToneColor="#6C63FF"
                  />
                )}
              </div>
              {this.state.displayTodayDetail ? (
                <div>
                  <DayCharts hourly={hourly} />
                </div>
              ) : (
                <h3>{hourly.summary}</h3>
              )}
            </div>
          ) : null}
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
      forecastData: state.weatherData.weather,
      week: state.weatherData.week
    }),
    dispatch => ({
      fetchWeatherByZipcode: zipcode => {
        return dispatch(fetchWeatherByZipcode(zipcode));
      },
      fetchLocationByIP: () => {
        return dispatch(fetchLocationByIP());
      },
      fetchWeatherByIP: () => {
        return dispatch(fetchWeatherByIp());
      },
      fetchHourlyWeatherByLocationTime: (lat, lng, time) => {
        return dispatch(fetchHourlyWeatherByLocationTime(lat, lng, time));
      }
    })
  )(Forecast)
);
