import React, { Component } from 'react';
import Alert from 'react-s-alert';
import PropTypes from 'prop-types';

class AlertTemplate extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    classNames: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    styles: PropTypes.instanceOf(Object).isRequired,
    handleClose: PropTypes.instanceOf(Function).isRequired,
  }

  handleConfirm() {
    const { id } = this.props;
    Alert.close(id);
  }

  render() {
    const {
      classNames,
      id,
      message,
      styles,
      handleClose,
    } = this.props;

    return (
      <div className={classNames} id={id} style={styles}>
        <div className="s-alert-box-inner">
          <span className="notif-table">
            <span className="notif-fa-cell">
              <span className="notif-fa">
                {
                  classNames.indexOf('s-alert-error') > -1
                    ? <span className="fa fa-exclamation-triangle" />
                    : null
                }
                {
                  classNames.indexOf('s-alert-success') > -1
                    ? <span className="fa fa-check" />
                    : null
                }
              </span>
            </span>{' '}
            <span className="notif-message">
              {message}
            </span>
          </span>
        </div>
        <span
          className="s-alert-close"
          onClick={handleClose}
          role="presentation"
        />
      </div>
    );
  }
}

export default AlertTemplate;
