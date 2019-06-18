import React, { PureComponent, Fragment } from "react";
import thumbnail from "assets/img/image-thumbnail.jpg";
import { withRouter } from "react-router-dom";
import { _ } from "app/Utils";

class EmployeeShortInfo extends PureComponent {
  render() {
    const { data } = this.props;

    return (
      <Fragment>
        <div className="card-body p-4">
          <div className="row">
            <div className="col-4 col-md-3">
              <div className="employee-photo ml-auto">
                <img
                  src={
                    !_.isNil(data.get('photo'))
                      ? data.get('photo')
                      : thumbnail
                  }
                  alt="..."
                  className="w-100 img-fluid img-thumbnail"
                />
              </div>
            </div>
            <div className="col">
              <div className="row">
                <div className="col-12">
                  <div className="details-item">
                    <h3 className="text-uppercase">
                      {data.get('name')}
                    </h3>
                  </div>
                </div>
                <div className="col-12">
                  <div className="details-item">
                    <p className="title">Address :</p>
                    <p className="answer">
                      {data.get('street')}, {data.get('barangay_name')}, {data.get('municipality_name')}, {data.get('province_name')}, {data.get('region_name')}, {data.get('zip_code')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(EmployeeShortInfo);
