import { useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import TabFormImages from "../Popup/TabFormImages";
import { useSelector } from "react-redux";
import { getSection } from '../../../redux/actions/actions';

export function TabViewImages() {
  const [isFormularioOpen, setIsFormularioOpen] = useState(false);
  const carrouselData = useSelector((state) => state.sheets.sectionData);
  const dispatch = useDispatch();


//   useEffect(() =>{
//     dispatch(getSection())
//   }),[dispatch]
  

  const handleOpenFormulario = () => {
    setIsFormularioOpen(true); // Abre el formulario
  };

  const handleCloseFormulario = () => {
    setIsFormularioOpen(false); // Cierra el formulario
  };

  return (
    <div className="w-full h-full p-5">
      <div className="flex justify-around mb-5">
        {/* Iteramos sobre 3 índices (0, 1, 2) */}
        {[0, 1, 2].map((index) => {
          const seccion = carrouselData && carrouselData[index];

          return (
            <div key={index} className="w-1/3 text-center">
              {/* Contenedor para imagen y texto */}
              <div className="border border-black p-3">
                {seccion && seccion.imageUrl ? (
                  <img
                    src={seccion.imageUrl}
                    alt={`Imagen ${seccion.numero}`}
                    className="w-full h-60 object-cover"
                  />
                ) : (
                  <div className="w-full h-60 flex justify-center items-center bg-gray-200">
                    <p>No se ha cargado la imagen todavía</p>
                  </div>
                )}
              </div>

              {/* Texto debajo de la imagen */}
              <div className="border border-black h-44 p-5 text-center mt-4">
                <p>
                  {seccion && seccion.texto
                    ? seccion.texto
                    : "No se ha cargado el texto todavía"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={handleOpenFormulario}
        className="p-2 border border-secondary bg-secondary text-white rounded-md hover:bg-primary hover:text-white active:translate-y-[2px] shadow-sm hover:shadow-md"
      >
        Modificar carrusel
      </button>

      {/* Renderiza el formulario si isFormularioOpen es true */}
      <TabFormImages isOpen={isFormularioOpen} onClose={handleCloseFormulario} />
    </div>
  );
}
