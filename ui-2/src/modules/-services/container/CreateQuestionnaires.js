/* eslint-disable */
import React, { PureComponent } from 'react';

class CreateQuestionnaires extends PureComponent {
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
        <div className=" mb-3 w-100">
          <form>
            <input type="text" className="form-control" placeholder="Add Question" />
            <select title="Pick a number" class="selectpicker">
              <option>Select...</option>
              <option>One</option>
              <option>Two</option>
              <option>Three</option>
            </select>
            <div className="form-check mt-3">
              <input
                className="form-check-input"
                type="radio"
                name="exampleRadios"
                value="option1"
              />
              <label className="form-check-label">Option 1</label>
              <hr />
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="exampleRadios"
                value="option2"
              />
              <label className="form-check-label">
                Add option or <span className="create-group-required">ADD "OTHER"</span>
              </label>
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
        </ul>
      </>
    );
  }
}

export default CreateQuestionnaires;
