import React, { Component } from "react";
import "css/DayCard.css";

import { formatDate, getAbbrevDay } from "utils/formatDate.js";

import { Card } from "antd";

const { Meta } = Card;

var options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
};

class DayCard extends Component {
  constructor(props) {
    super(props);
  }

  handleDayClick(event) {}

  render() {
    var { data } = this.props;
    var date = data.time ? new Date(data.time * 1000) : null;
    console.log("data", data);
    return (
      <div
        className="day-container"
        style={{ margin: "0px", flexDirection: "row" }}
        title={data ? data.summary : null}
      >
        <div className="icon-container">
          <img alt="icon" src={`./svgs/${data.icon}.svg`} />
        </div>
        <div className="date">
          <span style={{ fontSize: "2em" }}>
            {getAbbrevDay(new Date(date))}
          </span>
        </div>
        <div className="temperature-bar-container">
          <span
            style={{
              padding: "0px 5px",
              width: `${data.temperatureLow}%`,
              textAlign: "right"
            }}
          >
            {Math.round(data.temperatureLow) + "°"}
          </span>
          <span
            className="temperature-bar"
            style={{
              width: `${100 -
                data.temperatureLow -
                (100 - data.temperatureHigh)}%`
            }}
          />
          <span style={{ padding: "0px 5px" }}>
            {Math.round(data.temperatureHigh) + "°"}
          </span>
        </div>
      </div>
    );
  }
}

export default DayCard;
