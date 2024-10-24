import React from 'react';

const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="relative bg-zinc-950 p-6 rounded shadow-lg max-w-lg w-full">
        {/* Close button inside the modal in the top right corner */}
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-orange-400 text-xl font-bold focus:outline-none"
          aria-label="Close"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
