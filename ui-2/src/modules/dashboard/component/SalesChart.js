/* eslint-disable */
import React, { PureComponent } from "react";
import { Line } from "react-chartjs-2";
import { withRouter } from "react-router-dom";
class SalesChart extends PureComponent {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const data = canvas => {
      const ctx = canvas.getContext("2d");
      const gradientFade = ctx.createLinearGradient(0, 0, 0, 400);
      gradientFade.addColorStop(0, "#D31C2A");
      gradientFade.addColorStop(1, "#811E2D");
      return {
        labels: ["JUN 28", "JUL 4", "JUL 10", "JUL 16", "JUL 22"],
        datasets: [
          {
            label: "Total MultiPart Sales",
            fill: true,
            cubicInterpolationMode: "monotone",
            backgroundColor: gradientFade,
            borderColor: "rgba(255, 255, 255, 0)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBackgroundColor: "rgba(255,255,255,1)",
            pointBorderColor: "#FFC94A",
            pointBorderWidth: 2,
            pointRadius: 3,
            borderWidth: 2,
            pointHitRadius: 50,
            data: [20, 30, 24, 66, 80]
          }
        ]
      };
    };

    return (
      <Line
        data={data}
        height={150}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                display: false,
                gridLines: {
                  display: false
                }
              }
            ],
            yAxes: [
              {
                display: false,
                gridLines: {
                  display: false
                },
                ticks: {
                  beginAtZero: true,
                  steps: 5,
                  stepValue: 5,
                  max: 100
                }
              }
            ]
          },
          legend: {
            display: false
          },
          tooltips: {
            enabled: true
          },
          hover: { mode: null }
        }}
      />
    );
  }
}

export default withRouter(SalesChart);
