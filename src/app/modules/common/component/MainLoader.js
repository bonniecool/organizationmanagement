import React, { PureComponent } from "react";
import nbiLogo from "assets/img/nbi-main-logo.png";

class MainLoader extends PureComponent {
  render() {
    return (
      <div className="loading-wrapper">
        {
          // <img src={nbiLogo} className="progress-logo" alt="NBI HRIS" />
        }
        <h3 className="progress-name">NBI HRIS</h3>
        <div className="progress-loading" />
      </div>
    );
  }
}

export default MainLoader;
