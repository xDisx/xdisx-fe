import React from "react";
import ReactDOM from "react-dom";
import "./Modal.scss"; // Assuming you will create a separate SCSS file for styling

const Modal = ({ isOpen, title, content, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h5>{title}</h5>
          <button onClick={onCancel} className="close-button">
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p>{content}</p>
        </div>
        <div className="modal-footer">
          <button onClick={onConfirm} className="confirm-button">
            Yes
          </button>
          <button onClick={onCancel} className="cancel-button">
            No
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
