import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Routes from "./Routes";
import Alert from "react-s-alert";
import AlertTemplate from "./modules/common/component/AlertTemplate";
import AlertMarker from "./modules/common/component/Override";

class App extends Component {
  state = {
    component: null
  };

  componentWillMount() {
    const { dispatch, isAuthenticated } = this.props;
    dispatch({
      type: "CHECK_AUTH"
    });
    if (isAuthenticated) {
      dispatch({
        type: "MY_PROFILE"
      });
    }
  }

  onCloseModal = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "MODAL",
      data: {
        isOpen: false
      }
    });
  };

  componentWillReceiveProps(nextProps) {
    const { modal } = nextProps;
    if (modal !== this.props.modal) {
      if (modal.isOpen) this.handleOpenModal();

      if (!modal.isOpen) this.setState({ component: null });
    }
  }

  async handleOpenModal() {
    const component = await import("./modules/common/component/Modal");
    this.setState({ component });
  }

  render() {
    const { isAuthenticated, isLoading, modal } = this.props;
    const Modal = this.state.component;
    return (
      <div>
        {/* { isLoading && <Loader /> } */}
        <div className={`${isLoading ? "active" : ""} main-loader`} />
        <Routes isAuthenticated={isAuthenticated} />
        {Modal && (
          <Modal.default data={modal} onClose={this.onCloseModal}>
            {modal.content}
          </Modal.default>
        )}
        <Alert
          stack={{ limit: 1 }}
          effect="slide"
          contentTemplate={AlertTemplate}
        />
        <div id="my-confirm-modal" />
        <div id="modal-root" />
        <AlertMarker /> 
      </div>
    );
  }
}

const mapStateToProps = (state, routeParams) => {
  const { isAuthenticated } = state.auth.toJS();
  const { loadingTypes } = state.loading;
  const modal = state.modal.toJS();
  return {
    isLoading: loadingTypes.length > 0,
    isAuthenticated,
    modal
  };
};

export default withRouter(connect(mapStateToProps)(App));
