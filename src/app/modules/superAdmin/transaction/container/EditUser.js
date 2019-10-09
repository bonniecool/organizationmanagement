import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import camera from 'assets/images/camera.jpg';
import DatePicker from 'react-datepicker';

class EditUser extends PureComponent {
  render() {
    return (
      <div>
        <div className="header d-flex align-items-center">
          <Link to="/user-list" className="ml-auto btn btn-light rounded-pill">
            Cancel
          </Link>
          <Link to="/user-list" className="ml-2 btn btn-primary rounded-pill">
            Save
          </Link>
        </div>
        <form>
          <div className="row">
            <div className="col-md-3">
              <div className="user-details-wrapper">
                <div className="user-details-image-wrapper">
                  <img className="user-image" src={camera} alt="UserImage" />
                  <button type="button" className="btn btn-secondary mt-2">
                    Upload Photo
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="row mt-1">
                <div className="col-md-4">
                  <p className="user-information-label">
                    First Name <span className="create-group-required">*</span>
                  </p>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-md-4">
                  <p className="user-information-label">
                    Middle Name <span className="create-group-required">*</span>
                  </p>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-md-4">
                  <p className="user-information-label">
                    Last Name <span className="create-group-required">*</span>
                  </p>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="user-information-label">
                    Gender <span className="create-group-required">*</span>
                  </p>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-md-4">
                  <p className="user-information-label">
                    Birthdate <span className="create-group-required">*</span>
                  </p>
                  <DatePicker className="form-control" placeholderText="mm/dd/yyyy" />
                </div>
                <div className="col-md-4">
                  <p className="user-information-label">
                    Mobile Number <span className="create-group-required">*</span>
                  </p>
                  <input type="text" className="form-control" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default EditUser;
