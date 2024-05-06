import React from "react";
import "./ConfirmationModal.scss";

// ConfirmationModal for confirmation

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="confirmation-modal">
        <p>{message}</p>   
        <div className="buttons">
          <button onClick={onConfirm}>Yes</button> 
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;