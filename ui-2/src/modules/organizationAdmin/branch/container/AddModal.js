import React, { Component } from 'react';
import Modal from 'modules/common/components/Modal';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { omitEmptyArgs } from 'helper';
import withForm from 'modules/common/hoc/withForm';
import PropTypes from 'prop-types';
import _ from 'lodash';
import * as actions from '../actions';
import * as c from '../constants';

class AddModal extends Component {
    static propTypes = {
      setFormData: PropTypes.instanceOf(Function).isRequired,
      formData: PropTypes.instanceOf(Object).isRequired,
      createInput: PropTypes.instanceOf(Function).isRequired,
      createSelect: PropTypes.instanceOf(Function).isRequired,
      create: PropTypes.instanceOf(Function).isRequired,
      getBranches: PropTypes.instanceOf(Function).isRequired,
      getDetails: PropTypes.instanceOf(Function).isRequired,
      getRegions: PropTypes.instanceOf(Function).isRequired,
      regionsList: PropTypes.instanceOf(Object),
    }

    static defaultProps = {
      regionsList: [],
    }

    static contextTypes = {
      setModal: PropTypes.instanceOf(Function).isRequired,
    }

    componentDidMount = () => {
      const { setFormData, getRegions, getBranches } = this.props;
      setFormData(c.FORM_DATA);
      getRegions();
      getBranches();
    }

    closeModal = () => {
      const { setModal } = this.context;
      setModal({
        isOpen: false,
      });
    }

    onSubmit = (e) => {
      e.preventDefault();
      const {
        create, formData, getDetails, getBranches,
      } = this.props;

      const args = omitEmptyArgs(_.omit(formData, ['_key']));
      create(args, () => {
        getBranches({}, (callback) => {
          if (_.get(callback, 'data').length > 0) {
            const id = _.get(callback, 'data[0].id');
            getDetails(id);
          }
        });
        this.closeModal();
      });
    }


    render() {
      const { createInput, createSelect, regionsList } = this.props;
      console.log(regionsList);
      const regions = regionsList.map(item => ({
        label: item.name,
        value: item.code,
      }));
      return (
        <div>
          <form onSubmit={this.onSubmit}>
            <Modal.Body>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    { createInput({ key: 'name', label: 'Name' }, { required: false }) }
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    { createSelect({ key: 'code', label: 'Regions' }, regions, { required: true }) }
                  </div>
                </div>
              </div>

            </Modal.Body>
            <Modal.Footer>
              <button
                type="submit"
                className="btn btn-primary btn-md"
              >
                        Submit
              </button>
              <button
                type="button"
                onClick={this.closeModal}
                className="btn btn-danger btn-md"
              >
                    Close
              </button>
            </Modal.Footer>
          </form>
        </div>
      );
    }
}

const mapStateToProps = ({ api }) => ({
  regionsList: _.get(api, `${c.GET_REGIONS}.list`) || [],
  branchDetails: _.get(api, `${c.GET_DETAILS}.item`) || {},
});

const enhance = _.flowRight([
  withRouter,
  connect(mapStateToProps, actions),
  withForm,
]);

export default enhance(AddModal);
