import { useState } from "react";
import { useDispatch } from "react-redux";
import { createSection } from "../../../redux/actions/actions";

export default function TabFormImages({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const [secciones, setSecciones] = useState([
    { imagen: null, seccion: 1, texto: "" },
    { imagen: null, seccion: 2, texto: "" },
    { imagen: null, seccion: 3, texto: "" },
  ]);

  const handleChangeImagen = (index, event) => {
    const file = event.target.files[0];
    setSecciones((prevSecciones) => {
      const nuevasSecciones = [...prevSecciones];
      nuevasSecciones[index].imagen = file;
      return nuevasSecciones;
    });
  };

  const handleChangeTexto = (index, event) => {
    const { value } = event.target;
    if (value.length <= 200) {
      setSecciones((prevSecciones) => {
        const nuevasSecciones = [...prevSecciones];
        nuevasSecciones[index].texto = value;
        return nuevasSecciones;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    secciones.forEach((seccion) => {
      dispatch(createSection(seccion));
      console.log("seccion: ", seccion);
      
    });
    onClose(); // Cerrar el popup tras el submit
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-gray-800 bg-opacity-50 overflow-y-auto">
      <form
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl max-h-[90vh] overflow-y-auto relative"
        onSubmit={handleSubmit}
      >
        <button
          onClick={onClose}
          className="text-gray-400 text-3xl hover:text-gray-500 absolute top-4 right-4"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Crear Secciones</h2>
        {secciones.map((seccion, index) => (
          <div key={index} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sección {seccion.seccion}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleChangeImagen(index, e)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
            />
            <textarea
              value={seccion.texto}
              onChange={(e) => handleChangeTexto(index, e)}
              placeholder="Escribe un texto (máx. 200 palabras)"
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
            />
            <p className="text-right text-sm text-gray-500">
              {seccion.texto.length} / 200 palabras
            </p>
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600"
        >
          Guardar Secciones
        </button>
      </form>
    </div>
  );
}
