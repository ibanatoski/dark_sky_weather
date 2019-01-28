import React, { Component } from "react";
import "css/DayCard.css";

import DayCharts from "components/DayCharts.js";

import { formatDate, getAbbrevDay, formatTime } from "utils/formatDate.js";

import { Card, Icon, Button } from "antd";

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
    this.state = {
      renderDetail: false,
      showMore: false
    };
  }

  handleDayClick = e => {
    this.setState({
      renderDetail: !this.state.renderDetail
    });
  };

  handleShowMore = () => {
    console.log("show More");
    if (!this.props.hourly) {
      this.props.loadMore();
    }
    this.setState({
      showMore: !this.state.showMore
    });
  };

  renderExtraDetail = data => {
    return (
      <div className="extra-detail-card">
        <div className="detail-card-stats">
          <div
            className="detail-stat"
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <div>
              <span
                style={{
                  display: "block",
                  fontSize: "12pt",
                  fontWeight: "bold"
                }}
              >
                {Math.round(data.temperatureLow) + "°F "}
              </span>
              {formatTime(new Date(data.temperatureLowTime * 1000))}
            </div>
            <Icon type="arrow-right" style={{ margin: "10%" }} />
            <div>
              <span
                style={{
                  display: "block",
                  fontSize: "12pt",
                  fontWeight: "bold"
                }}
              >
                {Math.round(data.temperatureHigh) + "°F "}
              </span>
              {formatTime(new Date(data.temperatureHighTime * 1000))}
            </div>
          </div>
          <div className="detail-stat">
            <img width="50%" alt="sunrise" src="./svgs/sunrise.svg" />
            {formatTime(new Date(data.sunriseTime * 1000))}
          </div>
          <div className="detail-stat">
            <img width="50%" alt="sunrise" src="./svgs/sunset.svg" />
            {formatTime(new Date(data.sunsetTime * 1000))}
          </div>
          <div className="detail-stat">
            {data.precipType ? (
              <img
                width="50%"
                alt="precip"
                src={`./svgs/${data.precipType}.svg`}
              />
            ) : (
              <img width="50%" alt="precip" src={`./svgs/${data.icon}.svg`} />
            )}

            <div>
              <span>
                {data.precipType
                  ? data.precipType.toUpperCase()
                  : "Precipitation"}
              </span>
              <span style={{ display: "block" }}>
                {data.precipProbability}%
              </span>
            </div>
          </div>
        </div>
        <div className="extra-detail-card-desc">
          <span style={{ display: "block", fontSize: ".7em" }}>
            {formatDate(new Date(data.time * 1000))}
          </span>
          {data.summary}
          <span style={{ display: "block", fontSize: ".7em" }}>
            {this.props.hourly && this.state.showMore ? (
              <Button onClick={this.handleShowMore}>Show Less</Button>
            ) : (
              <Button onClick={this.handleShowMore}>Show More</Button>
            )}
          </span>
        </div>
        {this.props.hourly && this.state.showMore ? (
          <div style={{ margin: "5% 1%" }}>
            <DayCharts
              height={100}
              hourly={this.props.hourly}
              displayGrids={false}
            />
          </div>
        ) : null}
      </div>
    );
  };

  render() {
    var { data } = this.props;
    var date = data.time ? new Date(data.time * 1000) : null;
    var temperatureBarWith =
      100 - data.temperatureLow - (100 - data.temperatureHigh);
    return (
      <div className="day-container" title={data ? data.summary : null}>
        <div className="day-container-top" onClick={this.handleDayClick}>
          <div className="day-accent">
            <div className="icon-container">
              <img alt="icon" src={`./svgs/${data.icon}.svg`} />
            </div>
            <div className="day-of-week">
              <span style={{ fontSize: "2em" }}>
                {getAbbrevDay(new Date(date))}
              </span>
            </div>
          </div>
          <div className="temperature-bar-container">
            <span
              style={{
                zIndex: "100",
                width: `${data.temperatureLow}%`,
                textAlign: "right"
              }}
            >
              {Math.round(data.temperatureLow) + "°"}
            </span>
            <span
              className="temperature-bar"
              style={{
                marginLeft: "10px",
                width: `${temperatureBarWith}%`
              }}
            />
            <span style={{ padding: "0px 5px" }}>
              {Math.round(data.temperatureHigh) + "°"}
            </span>
          </div>
          <div
            style={{ width: "100px", margin: "0px 10px", textAlign: "center" }}
          >
            {this.state.renderDetail ? (
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
        </div>

        {this.state.renderDetail ? this.renderExtraDetail(data) : null}
      </div>
    );
  }
}

export default DayCard;
