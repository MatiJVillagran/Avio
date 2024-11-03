import React from "react";

const TabDescriptionModal = ({ description, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Descripción</h2>
        <p className="text-gray-700 mb-6">{description}</p>
        <button
          onClick={onClose}
          className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-md"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default TabDescriptionModal;
