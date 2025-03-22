const BankModal = ({ onClose }) => {
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-bold mb-4">Datos para la transferencia</h2>
          <p>ALIAS: mate.armonia.verde</p>
          <p>CBU: 2850310140095353008768</p>
          <p>Apellido y Nombre: DOPAZO FRANCISCO</p>
          
          <button
            onClick={onClose}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  };
  
  export default BankModal;
  