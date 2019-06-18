import React, { PureComponent } from "react";
import RModal from "react-modal";

export const Body = ({ children }) => (
    <div className="modal-body">
        {children}
    </div>
);

export const Footer = ({ children }) => (
    <div className="modal-footer">
        {children}
    </div>
);

class Modal extends PureComponent {
    static defaultProps = {
        isOpen: false,
        title: "Modal Title",
        modalSize: "modal-md"
    };

    render() {
        const { onClose, children, data } = this.props;
        return (
            <RModal
                className={`Modal__Bootstrap ${data.modalSize} modal-dialog`}
                closeTimeoutMS={10}
                contentLabel=""
                ariaHideApp={false}
                isOpen={data.isOpen}
                onRequestClose={onClose}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">{data.title}</h4>
                        <button
                            type="button"
                            className="close"
                            onClick={onClose}>
                            <span aria-hidden="true">×</span>
                            <span className="sr-only">Close</span>
                        </button>
                    </div>
                    { children }
                </div>
            </RModal>
        );
    }
}

Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
