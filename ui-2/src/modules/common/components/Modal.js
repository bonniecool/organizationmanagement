/*eslint-disable */
import React, { PureComponent } from 'react';
import RModal from 'react-modal';
import PropTypes from 'prop-types';

export const Body = ({ children }) => (
  <div className="modal-body">{children}</div>
);

export const Footer = ({ children }) => (
  <div className="modal-footer">{children}</div>
);

export const Confirmation = ({
  onYes,
  onNo,
  yesLabel,
  noLabel,
}) => (
  <div className="modal-body text-right">
    <button type="button" className="btn btn-danger" onClick={onYes}>
      {yesLabel || 'Yes'}
    </button>{' '}
    <button type="button" className="btn btn-secondary" onClick={onNo}>
      {noLabel || 'No'}
    </button>
  </div>
);

Confirmation.defaultProps = {
  onYes: null,
  onNo: null,
  yesLabel: '',
  noLabel: '',
};

Confirmation.propTypes = {
  onYes: PropTypes.instanceOf(Function),
  onNo: PropTypes.instanceOf(Function),
  yesLabel: PropTypes.string,
  noLabel: PropTypes.string,
};

class Modal extends PureComponent {
  static propTypes = {
    onClose: PropTypes.instanceOf(Function),
    data: PropTypes.instanceOf(Object),
    modalSize: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
  };

  static defaultProps = {
    children: null,
    onClose: null,
    modalSize: '',
    data: {},
  };

  render() {
    const {
      onClose,
      children,
      data,
      modalSize,
    } = this.props;

    return (
      <RModal
        className={`Modal__Bootstrap ${_.get(data, 'modalSize') || modalSize} modal-dialog`}
        closeTimeoutMS={10} // 150
        contentLabel=""
        ariaHideApp={false}
        isOpen={_.get(data, 'isOpen')}
        onRequestClose={_.get(data, 'unClose') ? () => {} : onClose}
      >
        <div className="modal-content">
          {!_.get(data, 'hideHeader') && (
            <div className="modal-header">
              <h4 className="modal-title">
                {_.get(data, 'isOpen') ? _.get(data, 'title') : null}
                {!_.get(data, 'noCloseButton') && (
                  <button type="button" className="close" onClick={onClose}>
                    <span aria-hidden="true">&times;</span>
                    <span className="sr-only">Close</span>
                  </button>
                )}
              </h4>
            </div>
          )}
          {_.get(data, 'isOpen') ? children : null}
        </div>
      </RModal>
    );
  }
}

Modal.Body = Body;
Modal.Footer = Footer;
Modal.Confirmation = Confirmation;

export default Modal;
