/* eslint-disable */
import React, { Component } from "react";
import { IconArrowUp } from "./Icon";

class StatisticsPanel extends Component {
  state = {
    toggleWrapper: false
  };

  toggleStatistics = () => {
    const { toggleWrapper } = this.state;
    this.setState({
      toggleWrapper: !toggleWrapper
    });
  };

  render() {
    const { toggleWrapper } = this.state;
    return (
      <>
        <div
          className={`${!toggleWrapper ? "hide" : "show"} statistics-wrapper`}
        >
          <div className="action">
            <button
              type="button"
              className="btn-action"
              onClick={this.toggleStatistics}
            >
              Statistics
            </button>
          </div>
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12 col-md-4 px-0">
                  <div className="statistic-details d-flex align-items-center align-content-center justify-content-center with-divider">
                    <h3 className="value">370</h3>
                    <IconArrowUp />
                    <p className="text">
                      <span className="name">Sales</span>
                      <br />
                      <span className="increase">+43</span> this week
                    </p>
                  </div>
                </div>
                <div className="col-12 col-md-4 px-0">
                  <div className="statistic-details d-flex align-items-center align-content-center justify-content-center with-divider">
                    <h3 className="value highlight">735</h3>
                    <IconArrowUp />
                    <p className="text">
                      <span className="name">Customer</span>
                      <br />
                      <span className="increase">+13</span> this week
                    </p>
                  </div>
                </div>
                <div className="col-12 col-md-4 px-0">
                  <div className="statistic-details d-flex align-items-center align-content-center justify-content-center">
                    <h3 className="value">3.5k</h3>
                    <p className="text">
                      <span className="name">Pending</span>
                      <br />
                      <span className="increase">+1.5k</span> this week
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default StatisticsPanel;
