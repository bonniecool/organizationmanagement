import React from 'react';
import { render } from 'react-dom';

const ConfirmAlert = (
  label,
  onYes,
  onNo,
  options = { yesLabel: 'Yes', noLabel: 'No' },
) => {
  const rootElement = document.getElementById('my-confirm-modal');

  const handleYes = () => {
    if (onYes) {
      onYes();
    }
    render(<div id="my-confirm-modal" />, rootElement);
  };

  const handleNo = () => {
    if (onNo) {
      onNo();
    }
    render(<div id="my-confirm-modal" />, rootElement);
  };

  render(
    <div>
      <div style={{ position: 'absolute' }}>
        <div
          className="modal show"
          style={{
            display: 'block',
            zIndex: 1051,
            backgroundColor: 'rgba(0, 0, 0, .6)',
            pointerEvents: 'none',
          }}
        >
          <div className="modal-dialog" style={{ pointerEvents: 'initial' }}>
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Confirmation</h4>
              </div>
              <div className="modal-body">
                <label>{label}</label>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleYes}
                >
                  {options.yesLabel}
                </button>{' '}
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={handleNo}
                >
                  {options.noLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
        { // eslint-disable-next-line
          <div
            className="modal-backdrop fade show"
            style={{ zIndex: 1050, pointerEvents: 'initial' }}
            onClick={handleNo}
          />
        }
      </div>
    </div>,
    rootElement,
  );
};

export default ConfirmAlert;
