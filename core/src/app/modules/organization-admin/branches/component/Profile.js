import React, { PureComponent, Fragment } from "react";
import img_thumbnail from "assets/img/image-thumbnail.jpg";
import { withRouter } from "react-router-dom";
import { _ } from "app/Utils";

class EmployeeShortInfo extends PureComponent {
  render() {
    const { data } = this.props;

    return (
      <Fragment>
        <div className="profile-header">
          <div className="">
            <div className="container-fluid p-4">
              <div className="row">
                <div className="col">
                  <div className="profile-photo">
                    <img
                      className="img-fluid w-100 img-thumbnail"
                      src={`${
                        _.isNil(data.get("photo")) ||
                        data.get("photo") === ""
                          ? img_thumbnail
                          : data.get("photo")
                      }`}
                      alt=""
                    />
                  </div>
                  <div className="profile-short-details">
                    <h3 className="name">
                      {data.get('name')}
                    </h3>
                    <h4 className="position">
                        <p className="mb-0">
                        {data.get('street')}, {data.get('barangay_name')}, {data.get('municipality_name')}, {data.get('province_name')}, {data.get('region_name')}, {data.get('zip_code')}
                        </p>
                    </h4>
                    <h4 className="service">
                      <p className="mb-0">
                      {data.get('contact')}
                      </p>
                    </h4>
                    <h4 className="service">
                      <p className="mb-0">
                      {data.get('email')}
                      </p>
                    </h4>
                    
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
