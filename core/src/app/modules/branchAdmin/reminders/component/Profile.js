import React, { PureComponent, Fragment } from "react";
import thumbnail from "assets/img/image-thumbnail.jpg";
import _ from "lodash";

export default class ProfileInfo extends PureComponent {
  render() {
    const { data, generateId } = this.props;

    return (
      <Fragment>
        <div className="card-body p-4">
          <div className="row">
            <div className="employee-photo ">
              <div className="ml-auto">
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
            <div className="col-md-9">
              <div className="row">
                <div className="col-12">
                  <div className="details-item">
                    <h3>
                      {data.get('first_name')}{", "}
                      {data.get('middle_name')}{" "}
                      {data.get('last_name')}
                    </h3>
                  </div>
                </div>
                <div className="col-12">
                  <div className="details-item">
                    <p className="title">Address :</p>
                    <p className="answer">
                      {data.get('street')}, {data.getIn(['barangay','name'])}, {data.getIn(['municipality','name'])}, {data.getIn(['province','name'])}, {data.getIn(['region','name'])}, {data.get('zip_code')}
                    </p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="details-item">
                    <p className="title">Gender :</p>
                    <p className="answer">
                    {data.get('gender')}
                    </p>
                  </div>
                </div>
                <div className="col-4">
                  <div className="details-item">
                    <p className="title">Birth Date :</p>
                    <p className="answer">
                    {data.get('birth_date')}
                    </p>
                  </div>
                </div>
                <div className="col-4">
                  <div className="details-item">
                    <p className="title">Mobile Number :</p>
                    <p className="answer">
                    {data.get('mobile_number')}
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
