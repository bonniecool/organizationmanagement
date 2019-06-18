import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root');

class ModalWrapper extends Component {
    render() {
        return createPortal(
          this.props.children,
          modalRoot,
        );
    }
}

export const Body = ({ children }) => (
    <div className="modal-body">
        { children }
    </div>
)

export const Footer = ({ children }) => (
    <div className="modal-footer">
        { children }
    </div>
)

class Modal extends Component {
    
    static defaultProps = {
        priority: 1
    }

    style = {
        display: 'block',
        paddingRight: 0
    }

    componentDidMount() {
        document.body.className='modal-open'
    }

    componentWillUnmount() {
        document.body.className=document.body.className.replace('modal-open','');
    }

    closeModal = () => {
        const { history, redirect } = this.props;
        history.push(redirect)
    }

    render() {
        const { size } = this.props;
        return (
            <ModalWrapper>
                <div className="modal fade show" style={this.style}>
                    <div className={`modal-dialog ${size || 'modal-lg'}`} role="document">
                        <div className="modal-content" style={{ pointerEvents: "initial" }}>
                            <div className="modal-header">
                                <div className="modal-title">{ this.props.title || 'Modal Title Here'}</div>
                                <button type="button" className="close" onClick={this.closeModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            { this.props.children }
                        </div>
                    </div>
                </div>
                <div className="modal-backdrop fade show" onClick={ this.closeModal }/>
                {/*<div className="modal-backdrop fade show" style={ this.bgStyle } onClick={ this.closeModal }/>*/}
            </ModalWrapper>
        );
    }
}

Modal.Body = Body;
Modal.Footer = Footer;


Modal.propTypes = {
    history: PropTypes.object.isRequired
}

export default Modal