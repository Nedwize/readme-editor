import React from 'react';
import { Toast } from 'react-bootstrap';

const ToastComponent = ({ show, handleClose, bg, message }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '4rem',
        right: '50%',
        color: 'white',
      }}
    >
      <Toast
        style={{
          position: 'relative',
          right: '-50%',
          color: 'white',
        }}
        className={bg}
        onClose={handleClose}
        show={show}
        delay={1000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default ToastComponent;
