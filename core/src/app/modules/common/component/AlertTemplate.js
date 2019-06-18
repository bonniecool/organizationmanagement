import React from 'react';
import Alert from 'react-s-alert';
class AlertTemplate extends React.Component {

    handleConfirm() {

        Alert.close(this.props.id);
    }
    render() {
        return (
            <div className={this.props.classNames} id={this.props.id} style={this.props.styles}>
                <div className='s-alert-box-inner'>
                    <span className="notif-table">
                        <span className="notif-fa-cell">
                            <span className="notif-fa">
                                {this.props.classNames.indexOf('s-alert-error') > -1 ?
                                <span className="fa fa-exclamation-triangle"/> : null}
                                {this.props.classNames.indexOf('s-alert-success') > -1 ?
                                <span className="fa fa-check"/> : null  }
                            </span>
                        </span>
                        <span className="notif-message">
                            {" "}{this.props.message}
                        </span>
                    </span>
                </div>
                <span className='s-alert-close' onClick={this.props.handleClose}></span>
            </div>
        )
    }
}

export default AlertTemplate;