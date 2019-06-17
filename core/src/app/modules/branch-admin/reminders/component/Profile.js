import React, { PureComponent, Fragment } from "react";
import { withRouter } from "react-router-dom";

class EmployeeShortInfo extends PureComponent {
  render() {
    const { data } = this.props;

    return (
      <Fragment>
        <div className="profile-header">
          <div className="">
            <div className="container-fluid p-4">
              <div className="row">
                <div className="col-md-12">
                  {data.get('content')}
                </div>
                <div className="col">
                  <div className="profile-short-details">
                    <h3 className="name">
                      {data.get('name')}
                    </h3>
                    <h4 className="position">
                        <p className="mb-0">
                        {data.get('address')}
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
