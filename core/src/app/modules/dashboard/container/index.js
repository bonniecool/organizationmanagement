import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import GeoMap from "../../chart/GeoMap";
import * as c from "../constant";
import { AsyncComponent } from "app/Utils";
const LineChartMultiple = AsyncComponent(() =>
  import("app/modules/chart/LineChartMultiple")
);
const Bar = AsyncComponent(() => import("app/modules/chart/Bar"));
const Doughnut = AsyncComponent(() => import("app/modules/chart/Doughnut"));
const Polar = AsyncComponent(() => import("app/modules/chart/Polar"));

const randomInt = (min, max, withFormat = false) => {
  const rand = Math.floor(Math.random() * (max - min + 1)) + min;
  if (withFormat) return formatNumber(rand);
  return rand;
};

const formatNumber = (
  n,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2
) => {
  return n.toLocaleString("en", {
    minimumFractionDigits,
    maximumFractionDigits
  });
};

class Dashboard extends Component {
  componentWillMount() {
    const { dispatch } = this.props;

    dispatch({
      type: c.GET_STATISTIC
    });
  }

  render() {
    const mapData = [
      {
        region_code: "010000000",
        aggregate: randomInt(0, 100)
      },
      {
        region_code: "020000000",
        aggregate: randomInt(0, 100)
      },
      {
        region_code: "030000000",
        aggregate: randomInt(0, 100)
      },
      {
        region_code: "040000000",
        aggregate: randomInt(0, 100)
      },
      {
        region_code: "170000000",
        aggregate: randomInt(0, 100)
      },
      {
        region_code: "050000000",
        aggregate: randomInt(0, 100)
      },
      {
        region_code: "060000000",
        aggregate: randomInt(0, 100)
      },
      {
        region_code: "070000000",
        aggregate: randomInt(0, 100)
      },
      {
        region_code: "080000000",
        aggregate: randomInt(0, 100)
      },
      {
        region_code: "090000000",
        aggregate: randomInt(0, 100)
      },
      {
        region_code: "100000000",
        aggregate: randomInt(0, 100)
      },
      {
        region_code: "110000000",
        aggregate: randomInt(0, 100)
      },
      {
        region_code: "120000000",
        aggregate: randomInt(0, 100)
      },
      {
        region_code: "160000000",
        aggregate: randomInt(0, 100)
      },
      {
        region_code: "130000000",
        aggregate: randomInt(0, 100)
      },
      {
        region_code: "140000000",
        aggregate: randomInt(0, 100)
      },
      {
        region_code: "150000000",
        aggregate: randomInt(0, 100)
      }
    ];

    const { statistic } = this.props;
    const status = statistic.get("by_status").toJS() || [];
    const gender = statistic.get("by_gender").toJS() || [];
    const payroll = statistic.get("payroll").toJS() || [];
    const active_employees = statistic.get("active_employees").toJS() || [];

    return (
      <Fragment>
        <div className="container-fluid">
          <div className="row">
            <header className="col-12">
              <div className="page-header d-flex justify-content-between align-content-center">
                <h2 className="title-header mr-auto">Dashboard</h2>
              </div>
            </header>
            <main className="col-12">
              <div className="row mb-3">
                {statistic.get("active_employees").map((item, key) => {
                  const color = {
                    background:
                      "#" + ((Math.random() * 0xffffff) << 0).toString(16)
                  };
                  return (
                    <div key={`user-${key}`} className="col-md-3 mt-2">
                      <div className="card mt-2">
                        <div className="card-body">
                          <div className="">
                            <div className="d-flex align-items-center">
                              <div className="circularIcon-wrapper">
                                <div className="circularIcon" style={color} />
                                <div className="titleItem mt-2">
                                  {item.get("status")}
                                </div>
                              </div>
                              <div className="numberItem ml-auto">
                                <h3 className="count">{item.get("count")}</h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="row mb-3">
                <div className="col d-flex">
                  <div
                    className="list-box card d-flex align-items-stretch"
                    style={{ width: "100%" }}
                  >
                    <div className="card-header d-flex align-items-center">
                      <h2 className="mr-auto">Financial Record</h2>
                    </div>
                    <div className="card-body list">
                      <div className="row">
                        <div className="col">
                          {
                            <LineChartMultiple
                              height={300}
                              payroll={payroll}
                              index_name="date"
                              index_value="value"
                            />
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row  mb-3">
                <div className="col-md-4">
                  <div className="list-box card d-flex align-items-stretch">
                    <div className="card-header d-flex align-items-center">
                      <h2 className="mr-auto">Civil Status</h2>
                    </div>
                    <div className="card-body list">
                      <div className="row">
                        <div className="col">
                          <Doughnut
                            data={status}
                            index_name="status"
                            index_value="count"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="list-box card d-flex align-items-stretch">
                    <div className="card-header d-flex align-items-center">
                      <h2 className="mr-auto">Employment Status</h2>
                    </div>
                    <div className="card-body list">
                      <div className="row">
                        <div className="col">
                          <Polar
                            data={active_employees}
                            index_name="status"
                            index_value="count"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="list-box card d-flex align-items-stretch">
                    <div className="card-header d-flex align-items-center">
                      <h2 className="mr-auto">Gender</h2>
                    </div>
                    <div className="card-body list">
                      <div className="row">
                        <div className="col">
                          <Bar
                            data={gender}
                            index_name="gender"
                            index_value="count"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="list-box card">
                    <div className="card-header d-flex align-items-center">
                      <h2 className="mr-auto">Map</h2>
                    </div>
                    <div className="card-body list">
                      <div className="row">
                        <div className="col">
                          <GeoMap data={mapData} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, routeParams) => {
  const dashboard = state.dashboard;
  const { auth } = state;
  return {
    statistic: dashboard.get("statistic"),
    user_type: auth.get("user_type")
  };
};

export default withRouter(connect(mapStateToProps)(Dashboard));
