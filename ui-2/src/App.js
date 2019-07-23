import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import Alert from 'react-s-alert';
import AlertTemplate from 'modules/common/components/AlertTemplate';
import Modal from 'modules/common/components/Modal';
import ScrollToTop from 'react-router-scroll-top';
import PotentialError from './PotentialError';
import Routes from './Routes';

class App extends PureComponent {
  static propTypes = {
    setModal: PropTypes.instanceOf(Function).isRequired,
    modal: PropTypes.instanceOf(Object).isRequired,
  }

  static defaultProps = {};

  static childContextTypes = {
    setModal: PropTypes.instanceOf(Function),
  };

  getChildContext() {
    const { setModal } = this.props;
    return {
      setModal,
    };
  }

  onCloseModal = () => {
    const { setModal } = this.props;
    setModal({
      isOpen: false,
      content: null,
      title: '',
    });
  };

  render() {
    const { modal } = this.props;

    return (
      <ScrollToTop>
        <PotentialError>

          <Alert key="alert" stack={{ limit: 1 }} effect="slide" contentTemplate={AlertTemplate} />
          <Modal key="modal-component" data={modal} onClose={this.onCloseModal}>
            {_.get(modal, 'content')}
          </Modal>
          <Routes />
        </PotentialError>
      </ScrollToTop>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  const setModal = (data) => {
    dispatch({
      type: 'SET_MODAL',
      data,
    });
  };

  return {
    setModal,
  };
};

const mapStateToProps = ({ modal }) => ({
  modal,
});

const enhance = _.flowRight([
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
]);

export default enhance(App);
