import React, { Component } from "react";

class SmallLoader extends Component {
  render() {
    return (
      <div className="d-flex align-content-center justify-content-center h-100">
        <div className="text-center empty-state my-auto">
          <div className="small-loader">
            <p className="loader-text">Loading..</p>
            <div className="bouncing-loader">
              <div />
              <div />
              <div />
            </div>
          </div>
        </div>
      </div>
    );
  }
  x;
}

export default SmallLoader;
