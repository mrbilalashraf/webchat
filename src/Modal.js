import React from 'react';
import './css/Modal.css';

const Modal = ({ isVisible, title, message, onConfirm, onCancel }) => {
  if (!isVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onConfirm} className="modal-button confirm">OK</button>
          {onCancel && (
            <button onClick={onCancel} className="modal-button cancel">Cancel</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
