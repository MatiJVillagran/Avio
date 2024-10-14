import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Compressor from "compressorjs";
import { createSection, uploadImages } from "../../../redux/actions/actions";
import toast from "react-hot-toast";

export default function TabFormImages({ isOpen, onClose }) {

  const dispatch = useDispatch();
  const images = useSelector((state) => state.sheets.images); // Obtener imágenes del estado global
  
  const [secciones, setSecciones] = useState([
    { imagen: null, seccion: 1, texto: "" },
    { imagen: null, seccion: 2, texto: "" },
    { imagen: null, seccion: 3, texto: "" },
  ]);
  const [isUploading, setIsUploading] = useState(false);
  
  useEffect(() => {
    // Actualizar el estado local `secciones` cuando cambie `images`
    setSecciones((prevSecciones) => 
      prevSecciones.map((seccion) => ({
        ...seccion,
        imagen: images[seccion.seccion - 1] || seccion.imagen
      }))
    );
  }, [images]);
  
  const handleChangeImagen = async (index, event) => {
    setIsUploading(true);
    const file = event.target.files[0];
  
    if (!file) {
      setIsUploading(false);
      return;
    }
  
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedFormats.includes(file.type)) {
      toast.error("Formato de imagen no soportado. Solo se permiten .jpg, .jpeg, .png, y .webp");
      setIsUploading(false);
      return;
    }
  
    try {
      const compressedFile = await new Promise((resolve, reject) => {
        new Compressor(file, {
          quality: 0.7,
          convertSize: 2000000,
          success: resolve,
          error: reject,
          mimeType: "image/webp",
        });
      });
  
      // Crear FormData para subir la imagen
      const formDataImage = new FormData();
      formDataImage.append("file", compressedFile);
  
      // Despachar la acción para subir la imagen
      await dispatch(uploadImages(formDataImage));
  
      // Verificar si la imagen ya está en el estado global
      if (images[index]) {
        // Si la imagen ya está en el estado global, actualizar directamente
        setSecciones((prevSecciones) => {
          const nuevasSecciones = [...prevSecciones];
          nuevasSecciones[index].imagen = images[index];
          return nuevasSecciones;
        });
      } else {
        // Si la imagen no está en el estado global, esperar a que se genere la URL
        const updatedImages = await new Promise((resolve) => {
          const unsubscribe = store.subscribe(() => {
            const state = store.getState();
            if (state.sheets.images.length > index && state.sheets.images[index]) {
              resolve(state.sheets.images);
              unsubscribe();
            }
          });
        });
  
        setSecciones((prevSecciones) => {
          const nuevasSecciones = [...prevSecciones];
          nuevasSecciones[index].imagen = updatedImages[index];
          return nuevasSecciones;
        });
      }
    } catch (error) {
      console.error("Error al comprimir o subir la imagen:", error);
    //   toast.error("Error al procesar la imagen");
    } finally {
      setIsUploading(false);
    }
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

    // Enviar todas las secciones como un solo payload JSON
    dispatch(createSection(secciones));
    console.log("secciones", secciones);

    window.location.reload();

    onClose(); // Cierra el modal
  };

  const handleImageDelete = (index) => {
    setSecciones((prevSecciones) => {
      const nuevasSecciones = [...prevSecciones];
      nuevasSecciones[index].imagen = null;
      return nuevasSecciones;
    });
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
        {isUploading && <div>Subiendo imagen...</div>}
        {secciones.map((seccion, index) => (
          <div key={index} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sección {seccion.seccion}
            </label>
            <div className="flex items-center mb-2">
              {seccion.imagen ? (
                <div className="relative">
                  <img
                    src={seccion.imagen}
                    alt={`seccion-${seccion.seccion}`}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageDelete(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                  >
                    &times;
                  </button>
                </div>
              ) : (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleChangeImagen(index, e)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              )}
            </div>
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