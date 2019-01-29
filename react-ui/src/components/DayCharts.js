import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import "css/DayCharts.css";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import { fetchHourlyWeatherByLocationTime } from "actions/weatherData";
import { formatXAxisHours, formatTime } from "utils/formatDate.js";

class DayCharts extends Component {
  state = {
    data: null
  };

  componentWillMount() {}

  render() {
    var { hourly } = this.props;
    console.log("Hourly", hourly);

    return (
      <div className="day-charts-container">
        <div className="chart-container">
          <h3>Temperature</h3>
          <ResponsiveContainer
            width={"100%"}
            height={this.props.height ? this.props.height : 200}
          >
            <AreaChart
              data={hourly.data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              {this.props.displayGrids ? (
                <CartesianGrid strokeDasharray="3 3" />
              ) : null}
              <XAxis dataKey="time" tickFormatter={formatXAxisHours} />
              <YAxis />
              <Tooltip
                labelFormatter={label =>
                  "time: " + formatTime(new Date(parseInt(label) * 1000))
                }
                formatter={temp => Math.round(temp) + "°F"}
              />
              <Area
                type="monotone"
                dataKey="temperature"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-container">
          <h3>Precipitation Probability</h3>
          <ResponsiveContainer
            width={"100%"}
            height={this.props.height ? this.props.height : 200}
          >
            <AreaChart
              data={hourly.data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              {this.props.displayGrids ? (
                <CartesianGrid strokeDasharray="3 3" />
              ) : null}
              <XAxis dataKey="time" tickFormatter={formatXAxisHours} />
              <YAxis tickFormatter={str => str * 100 + "%"} />
              <Tooltip
                labelFormatter={label =>
                  "time: " + formatTime(new Date(parseInt(label) * 1000))
                }
                formatter={temp => Math.round(temp) + "%"}
              />{" "}
              <Area
                type="monotone"
                dataKey="precipProbability"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-container">
          <h3>Wind Speed</h3>
          <ResponsiveContainer
            width={"100%"}
            height={this.props.height ? this.props.height : 200}
          >
            <AreaChart
              data={hourly.data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              {this.props.displayGrids ? (
                <CartesianGrid strokeDasharray="3 3" />
              ) : null}
              <XAxis dataKey="time" tickFormatter={formatXAxisHours} />
              <YAxis />
              <Tooltip
                labelFormatter={label =>
                  "time: " + formatTime(new Date(parseInt(label) * 1000))
                }
                formatter={temp => Math.round(temp) + "mph"}
              />{" "}
              <Area
                type="monotone"
                dataKey="windSpeed"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-container">
          <h3>Visibility</h3>

          <ResponsiveContainer
            width={"100%"}
            height={this.props.height ? this.props.height : 200}
          >
            <AreaChart
              data={hourly.data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              {this.props.displayGrids ? (
                <CartesianGrid strokeDasharray="3 3" />
              ) : null}
              <XAxis dataKey="time" tickFormatter={formatXAxisHours} />
              <YAxis />
              <Tooltip
                labelFormatter={label =>
                  "time: " + formatTime(new Date(parseInt(label) * 1000))
                }
                formatter={vis => Math.round(vis) + " miles"}
              />{" "}
              <Area
                type="monotone"
                dataKey="visibility"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-container">
          <h3>UV Index</h3>

          <ResponsiveContainer
            width={"100%"}
            height={this.props.height ? this.props.height : 200}
          >
            <AreaChart
              data={hourly.data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              {this.props.displayGrids ? (
                <CartesianGrid strokeDasharray="3 3" />
              ) : null}
              <XAxis dataKey="time" tickFormatter={formatXAxisHours} />
              <YAxis />
              <Tooltip
                labelFormatter={label =>
                  "time: " + formatTime(new Date(parseInt(label) * 1000))
                }
                formatter={index => Math.round(index) + ""}
              />{" "}
              <Area
                type="monotone"
                dataKey="uvIndex"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(
    state => ({}),
    dispatch => ({
      fetchHourlyWeatherByLocationTime: (latitude, longitude, timestamp) => {
        return dispatch(
          fetchHourlyWeatherByLocationTime((latitude, longitude, timestamp))
        );
      }
    })
  )(DayCharts)
);
