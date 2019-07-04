/* eslint-disable */
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { IconRadio, IconCheck } from '../../common/components/Icon';
class ServicesContainer extends PureComponent {
  state = {
    toggleAction: false,
  };

  showAction = () => {
    const { toggleAction } = this.state;
    this.setState({
      toggleAction: !toggleAction,
    });
  };
  render() {
    const { toggleAction } = this.state;
    return (
      <>
        <div className="header d-flex align-items-center">
          <Link to="/services/add" className=" ml-auto btn btn-primary rounded-pill">
            Create Service &nbsp; <i className="fa fa-plus" />
          </Link>
        </div>
        <div className="row">
          <div className="col-md-8 group-detail-container">
            <p className="group-title">Data &amp; Analytics </p>
            <p className="group-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ultricies sollicitudin
              volutpat. Duis ac massa nec nisl fringilla dignissim vitae nec mi.
            </p>
          </div>
          <div className="col-md-4 d-flex align-items-start justify-content-start align-content-start">
            <button type="button" className=" ml-auto btn btn-sm btn-secondary rounded-pill px-3">
              Edit Details
            </button>
          </div>
        </div>
        <div className="group-status-container">
          <span className="badge badge-main align-middle">ACTIVE</span>
          <label className="switch align-middle mb-0 ml-3">
            <input type="checkbox" />
            <span className="slider" />
          </label>
        </div>
        <div>
          <div className="services-questionnaires-container">
            <div className="header d-flex justify-content-between align-content-center align-items-center mb-3">
              <h3 className="group-list-title mb-0">Questionnaires (5)</h3>
              <button className=" ml-auto btn btn-sm btn-secondary rounded-pill px-3">
                Add Question &nbsp; <i className="fa fa-plus" />
              </button>
            </div>
            <div className="questionnaire-wizard">
              <form action="">
                <div className="form-group form-row">
                  <div className="col-9">
                    <input type="text" className="form-control" placeholder="Question" />
                  </div>
                  <div className="col-3">
                    <select title="Pick a number" class="form-control">
                      <option value="" defaultChecked>
                        Select Type
                      </option>
                      <option value="">Short Answer</option>
                      <option value="">Paragraph</option>
                      <option value="">Multiple choice</option>
                      <option value="">Checkboxes</option>
                      <option value="">Dropdown</option>
                      <option value="">File upload</option>
                    </select>
                  </div>
                </div>
                <div className="card question-type short-answer p-3 mb-3">
                  <div className="form-group">
                    <input
                      className="form-control question"
                      type="text"
                      name="questionType"
                      placeholder="Short answer text"
                      disabled
                    />
                  </div>
                  <div className="form-action">
                    <button type="reset" className="mr-2 btn btn-sm btn-light px-3 rounded-pill">
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="mr-auto btn btn-sm btn-success px-3 rounded-pill"
                    >
                      Add Question
                    </button>
                  </div>
                </div>
                <div className="card question-type paragraph p-3 mb-3">
                  <div className="form-group">
                    <textarea
                      className="form-control question"
                      name="questionType"
                      placeholder="Long answer text"
                      disabled
                      row="2"
                    />
                  </div>
                  <div className="form-action">
                    <button type="reset" className="mr-2 btn btn-sm btn-light px-3 rounded-pill">
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="mr-auto btn btn-sm btn-success px-3 rounded-pill"
                    >
                      Add Question
                    </button>
                  </div>
                </div>
                <div className="card question-type multiple-choice p-3 mb-3">
                  <div className="form-group form-row align-items-center">
                    <div className="col-1 pr-0 text-center">
                      <IconRadio />
                    </div>
                    <div className="col-11 pl-0">
                      <input
                        className="form-control question"
                        type="text"
                        name="questionType"
                        placeholder="Option 1"
                      />
                    </div>
                  </div>
                  <div className="form-group form-row align-items-center">
                    <div className="col-1 pr-0 text-center">
                      <IconRadio />
                    </div>
                    <div className="col-11 pl-0">
                      <button
                        type="button"
                        className="btn btn-link text-decoration-none px-0 text-muted"
                      >
                        Add Option
                      </button>
                    </div>
                  </div>
                  <div className="form-action">
                    <button type="reset" className="mr-2 btn btn-sm btn-light px-3 rounded-pill">
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="mr-auto btn btn-sm btn-success px-3 rounded-pill"
                    >
                      Add Question
                    </button>
                  </div>
                </div>
                <div className="card question-type checkboxes p-3 mb-3">
                  <div className="form-group form-row align-items-center">
                    <div className="col-1 pr-0 text-center">
                      <IconCheck />
                    </div>
                    <div className="col-11 pl-0">
                      <input
                        className="form-control question"
                        type="text"
                        name="questionType"
                        placeholder="Option 1"
                      />
                    </div>
                  </div>
                  <div className="form-group form-row align-items-center">
                    <div className="col-1 pr-0 text-center">
                      <IconCheck />
                    </div>
                    <div className="col-11 pl-0">
                      <button
                        type="button"
                        className="btn btn-link text-decoration-none px-0 text-muted"
                      >
                        Add Option
                      </button>
                    </div>
                  </div>
                  <div className="form-action">
                    <button type="reset" className="mr-2 btn btn-sm btn-light px-3 rounded-pill">
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="mr-auto btn btn-sm btn-success px-3 rounded-pill"
                    >
                      Add Question
                    </button>
                  </div>
                </div>
                <div className="card question-type dropdown p-3 mb-3">
                  <div className="form-group form-row align-items-center">
                    <div className="col-1 pr-0 text-center">
                      <p className="mb-0 font-weight-bold text-primary">1.</p>
                    </div>
                    <div className="col-11 pl-0">
                      <input
                        className="form-control question"
                        type="text"
                        name="questionType"
                        placeholder="Option 1"
                      />
                    </div>
                  </div>
                  <div className="form-group form-row align-items-center">
                    <div className="col-1 pr-0 text-center">
                      <p className="mb-0 font-weight-bold text-primary">2.</p>
                    </div>
                    <div className="col-11 pl-0">
                      <button
                        type="button"
                        className="btn btn-link text-decoration-none px-0 text-muted"
                      >
                        Add Option
                      </button>
                    </div>
                  </div>
                  <div className="form-action">
                    <button type="reset" className="mr-2 btn btn-sm btn-light px-3 rounded-pill">
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="mr-auto btn btn-sm btn-success px-3 rounded-pill"
                    >
                      Add Question
                    </button>
                  </div>
                </div>
                <div className="card question-type file-upload p-3 mb-3">
                  <div className="form-group">
                    <input type="file" name="" id="" />
                  </div>
                  <div className="form-action">
                    <button type="reset" className="mr-2 btn btn-sm btn-light px-3 rounded-pill">
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="mr-auto btn btn-sm btn-success px-3 rounded-pill"
                    >
                      Add Question
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <ul className="list-group">
              <li className="list-group-item questionnaires-item d-flex justify-content-between">
                <div className="d-flex flex-wrap">
                  <label className="switch align-middle mb-0 mr-3">
                    <input type="checkbox" />
                    <span className="slider" />
                  </label>
                  How many times per year do you visit QRZ Family Restaurant?
                </div>
                <div className="action">
                  <button
                    onClick={this.showAction}
                    className={`${!toggleAction ? 'show' : 'hide'} btn btn-more`}
                  >
                    <i className="fa fa-ellipsis-h" />
                  </button>
                  <button
                    className={`${!toggleAction ? 'hide' : 'show'} btn btn-close`}
                    onClick={this.showAction}
                  >
                    <i className="fa fa-times" />
                  </button>
                  <div className={`${!toggleAction ? 'hide' : 'show'} action-menu`}>
                    <ul className="list-unstyled action-list">
                      <li className="action-item">
                        <button type="button" className="btn btn-link action-link">
                          Edit
                        </button>
                      </li>
                      <li className="action-item">
                        <button type="button" className="btn btn-link action-link">
                          View
                        </button>
                      </li>
                      <li className="action-item">
                        <button type="button" className="btn btn-link action-link">
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="list-group-item questionnaires-item d-flex justify-content-between">
                <div className="d-flex">
                  <label className="switch align-middle mb-0 mr-3">
                    <input type="checkbox" />
                    <span className="slider" />
                  </label>
                  Do you visit QRZ Family Restaurant with family or friends?
                </div>
                <div className="action">
                  <button
                    onClick={this.showAction}
                    className={`${!this.props.toggleAction ? 'show' : 'hide'} btn btn-more`}
                  >
                    <i className="fa fa-ellipsis-h" />
                  </button>
                  <button
                    className={`${!this.props.toggleAction ? 'hide' : 'show'} btn btn-close`}
                    onClick={this.showAction}
                  >
                    <i className="fa fa-times" />
                  </button>
                  <div className={`${!this.props.toggleAction ? 'hide' : 'show'} action-menu`}>
                    <ul className="list-unstyled action-list">
                      <li className="action-item">
                        <button type="button" className="btn btn-link action-link">
                          Edit
                        </button>
                      </li>
                      <li className="action-item">
                        <button type="button" className="btn btn-link action-link">
                          View
                        </button>
                      </li>
                      <li className="action-item">
                        <button type="button" className="btn btn-link action-link">
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="list-group-item questionnaires-item d-flex justify-content-between">
                <div className="d-flex">
                  <label className="switch align-middle mb-0 mr-3">
                    <input type="checkbox" />
                    <span className="slider" />
                  </label>
                  How would you rate your overall experience at the QRZ Family Restaurant?
                </div>
                <div className="action">
                  <button
                    onClick={this.showAction}
                    className={`${!this.props.toggleAction ? 'show' : 'hide'} btn btn-more`}
                  >
                    <i className="fa fa-ellipsis-h" />
                  </button>
                  <button
                    className={`${!this.props.toggleAction ? 'hide' : 'show'} btn btn-close`}
                    onClick={this.showAction}
                  >
                    <i className="fa fa-times" />
                  </button>
                  <div className={`${!this.props.toggleAction ? 'hide' : 'show'} action-menu`}>
                    <ul className="list-unstyled action-list">
                      <li className="action-item">
                        <button type="button" className="btn btn-link action-link">
                          Edit
                        </button>
                      </li>
                      <li className="action-item">
                        <button type="button" className="btn btn-link action-link">
                          View
                        </button>
                      </li>
                      <li className="action-item">
                        <button type="button" className="btn btn-link action-link">
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="list-group-item questionnaires-item d-inline-flex justify-content-between">
                <div className="d-flex">
                  <label className="switch align-middle mb-0 mr-3">
                    <input type="checkbox" />
                    <span className="slider" />
                  </label>
                  How would you rate your overall experience at the QRZ Family Restaurant?
                </div>
                <div className="action">
                  <button
                    onClick={this.showAction}
                    className={`${!this.props.toggleAction ? 'show' : 'hide'} btn btn-more`}
                  >
                    <i className="fa fa-ellipsis-h" />
                  </button>
                  <button
                    className={`${!this.props.toggleAction ? 'hide' : 'show'} btn btn-close`}
                    onClick={this.showAction}
                  >
                    <i className="fa fa-times" />
                  </button>
                  <div className={`${!this.props.toggleAction ? 'hide' : 'show'} action-menu`}>
                    <ul className="list-unstyled action-list">
                      <li className="action-item">
                        <button type="button" className="btn btn-link action-link">
                          Edit
                        </button>
                      </li>
                      <li className="action-item">
                        <button type="button" className="btn btn-link action-link">
                          View
                        </button>
                      </li>
                      <li className="action-item">
                        <button type="button" className="btn btn-link action-link">
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="mt-5">
            <div className="group-list-container">
              <div className="header mb-3 d-flex align-items-center justify-content-between">
                <h3 className="group-list-title mb-0">Stages</h3>
                <button type="button" className="ml-auto btn btn-primary btn-sm px-3 rounded-pill">
                  Create Stages <i className="fa fa-plus" />
                </button>
              </div>
              <ul className="list-group">
                <li className="list-group-item group-user-item d-flex justify-content-between align-items-center">
                  Stage 1
                  <span className="group-list-remove">
                    Add Stage &nbsp;
                    <i className="fa fa-plus" />
                  </span>
                </li>
                <li className="list-group-item group-user-item d-flex justify-content-between align-items-center">
                  Stage 2
                </li>
                <li className="list-group-item group-user-item d-flex justify-content-between align-items-center">
                  Stage 3
                </li>
                <li className="list-group-item group-user-item d-flex justify-content-between align-items-center">
                  Stage 4
                </li>
                <li className="list-group-item group-user-item d-flex justify-content-between align-items-center">
                  Stage 5
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ServicesContainer;
