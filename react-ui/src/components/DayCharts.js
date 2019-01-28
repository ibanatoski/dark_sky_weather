import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import "css/DayCharts.css";

import { fetchHourlyWeatherByLocationTime } from "actions/weatherData";

class DayCharts extends Component {
  state = {
    data: null
  };

  componentWillMount() {}

  render() {
    return <div className="day-charts-container">PLace charts here</div>;
  }
}

export default withRouter(
  connect(
    state => ({
      forecastData: state.weatherData.weather
    }),
    dispatch => ({
      fetchHourlyWeatherByLocationTime: (latitude, longitude, timestamp) => {
        return dispatch(
          fetchHourlyWeatherByLocationTime((latitude, longitude, timestamp))
        );
      }
    })
  )(DayCharts)
);
