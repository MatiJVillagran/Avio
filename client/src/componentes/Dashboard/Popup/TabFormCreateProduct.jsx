import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Compressor from "compressorjs";
import Spinner from "../Spinner/Spinner";
import validationProductForm from "./validationProductForm";
import toast from "react-hot-toast";
import { addSheetRow, clearImages, updateRow, uploadImages } from "../../../redux/actions/actions";


export default function TabFormCreateProduct({ isOpen, onClose, product }) {
  const dispatch = useDispatch();
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    medida: "",
    cantidad: "",
    marca: "",
    precio: 0,
    url: [],
    descripcion: "",
  });
  const [errors, setErrors] = useState({});
  const img = useSelector((state) => state.sheets.images); // Selector de imágenes

  const memoizedErrors = useMemo(() => {
    return validationProductForm(formData);
  }, [formData]);

  useEffect(() => {
    setErrors(memoizedErrors);
  }, [memoizedErrors]);

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id || "",
        categoria: product.categoria || "",
        nombre: product.nombre || "",
        marca: product.marca || "",
        medida: product.medida || "",
        cantidad: product.stock || "",
        precio: product.precio || "",
        url: product.url ? product.url.split(",").map((url) => url.trim()) : [],
        descripcion: product.descripcion || "",
      });
    }
  }, [product]);

  // Manejo de la respuesta de la imagen subida
  useEffect(() => {
    if (img && img.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        url: [...prevData.url, ...img], // Asegurarse de que el valor de img sea la URL correcta
      }));
      dispatch(clearImages()); // Limpiar imágenes del estado global después de agregarlas al formData
    }
  }, [img, dispatch]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(memoizedErrors).length === 0) {
      try {
        const newRow = {
          categoria: formData.categoria,
          nombre: formData.nombre,
          marca: formData.marca,
          medida: formData.medida,
          cantidad: formData.cantidad,
          precio: formData.precio,
          url: formData.url.join(", "),
          descripcion: formData.descripcion,
        };

        if (product) {
          const updatedRows = {
            id: formData.id,
            categoria: formData.categoria,
            nombre: formData.nombre,
            marca: formData.marca,
            medida: formData.medida,
            cantidad: formData.cantidad,
            precio: formData.precio,
            url: formData.url.join(", "),
            descripcion: formData.descripcion,
          };

          dispatch(updateRow(updatedRows));
        } else {
          dispatch(addSheetRow(newRow));
        }
        setFormData({});
        onClose();
      } catch (error) {
        toast.error("Error al crear el nuevo producto");
      }
    }
  };

  const handleImageUpload = async (event) => {
    setIsUploading(true);

    const file = event.target.files[0];

    if (!file) {
      setIsUploading(false); // No file selected, stop uploading
      return;
    }

    // Validar formato de imagen
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedFormats.includes(file.type)) {
      toast.error(
        "Formato de imagen no soportado. Solo se permiten .jpg, .jpeg, .png, y .webp"
      );
      setIsUploading(false);
      return;
    }

    try {
      const compressedFile = await new Promise((resolve, reject) => {
        new Compressor(file, {
          quality: 0.7, // Ajuste según pruebas
          convertSize: 2000000, // Convierte imágenes mayores a 2MB en WebP
          success: resolve,
          error: reject,
          mimeType: "image/webp",
        });
      });

      console.log("Tamaño del archivo comprimido:", compressedFile.size);

      const formDataImage = new FormData();
      formDataImage.append("file", compressedFile);

      await dispatch(uploadImages(formDataImage));
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageClick = () => {
    document.getElementById("imageUploadInput").click();
  };

  const handleImageDelete = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      url: prevData.url.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <form
        className="bg-white  h-min-screen text-center shadow-md p-6 rounded-xl md:w-1/2 lg:w-auto m-2 flex flex-col max-h-[100vh] overflow-y-auto"
        onSubmit={handleSubmit}
      >
        <button
          onClick={onClose}
          className="text-gray-400 flex text-3xl hover:text-gray-500"
        >
          &times;
        </button>
        <div className="flex justify-center items-center">
          <div className="rounded-sm w-full py-2 px-4">
            <div className="mb-2 flex justify-center items-center gap-1">
              <div className="mt-4 cursor-pointer flex">
                {isUploading && <Spinner />}

                {formData?.url?.length > 0
                  ? formData?.url?.map((url, index) => (
                    <div
                      key={index}
                      className="relative mr-[5px] flex shadow-md rounded-full p-2 w-24 h-24 justify-center items-center border border-gray-800"
                    >
                      <img
                        src={url}
                        alt={`uploaded-${index}`}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleImageDelete(index)}
                        className="absolute bottom-0 right-0 flex justify-center items-center bg-red-500 text-white rounded-full p-1 w-6 h-6"
                      >
                        &times;
                      </button>
                    </div>
                  ))
                  : ""}
              </div>

              <div
                className="border cursor-pointer shadow-lg rounded-md p-4 flex justify-center items-center flex-col gap-2 hover:shadow-sm hover:border-blue-400 hover:text-blue-400"
                onClick={handleImageClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                  />
                </svg>
                <span>Cargar imagen</span>
                <input
                  type="file"
                  id="imageUploadInput"
                  onChange={handleImageUpload}
                  className="hidden"
                  multiple={false}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <label htmlFor="nombre">Nombre</label>
          <input
            className={`bg-white w-full p-2 text-center mt-2 rounded-md border ${errors.nombre ? "border-red-500" : "border-gray-400"
              }`}
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre"
          />
          {errors.nombre && (
            <p className="text-red-500 text-xs">{errors.nombre}</p>
          )}
        </div>
        <div className="mt-2">
          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            className={`bg-white w-full p-2 text-center mt-2 rounded-md border ${errors.categoria ? "border-red-500" : "border-gray-400"
              }`}
          >
            <option value="" disabled>
              Selecciona una categoría
            </option>
            <option value="Yerba">Yerba</option>
            <option value="Legumbres">Legumbres</option>
            <option value="Bebidas">Bebidas</option>
            <option value="Arroz">Arroz</option>
            <option value="Harinas y Fécula">Harinas y Fécula</option>
            <option value="Azúcar">Azúcar</option>
            <option value="Fideos">Fideos</option>
            <option value="Hierbas e Infusiones">Hierbas e Infusiones</option>
            <option value="Semillas">Semillas</option>
            <option value="Condimentos">Condimentos</option>
            <option value="Aceitunas y Aceites">Aceitunas y Aceites</option>
            <option value="Otros alimentos">Otros alimentos</option>
            <option value="Cuidado personal">Cuidado personal</option>
          </select>
          {errors.categoria && (
            <p className="text-red-500 text-xs">{errors.categoria}</p>
          )}
        </div>
        <div className="flex flex-row justify-center items-center gap-2">
          <div className="mt-2 w-1/2">
            <label htmlFor="medida">Medida</label>
            <input
              className={`bg-white w-full p-2 text-center mt-2 rounded-md border ${errors.medida ? "border-red-500" : "border-gray-400"
                }`}
              type="text"
              id="medida"
              name="medida"
              value={formData.medida}
              onChange={handleChange}
              placeholder="Medida"
            />
            {errors.medida && (
              <p className="text-red-500 text-xs">{errors.medida}</p>
            )}
          </div>
          <div className="mt-2 w-1/2">
            <label htmlFor="cantidad">Cantidad</label>
            <input
              className={`bg-white w-full p-2 text-center mt-2 rounded-md border ${errors.stock ? "border-red-500" : "border-gray-400"
                }`}
              type="text"
              id="cantidad"
              name="cantidad"
              value={formData.cantidad}
              onChange={handleChange}
              placeholder="Cantidad"
            />
            {errors.stock && (
              <p className="text-red-500 text-xs">{errors.stock}</p>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-2">
          <div className="mt-2 w-1/2">
            <label htmlFor="marca">Marca</label>
            <input
              className={`bg-white w-full p-2 text-center mt-2 rounded-md border ${errors.marca ? "border-red-500" : "border-gray-400"
                }`}
              type="text"
              id="marca"
              name="marca"
              value={formData.marca}
              onChange={handleChange}
              placeholder="Marca"
            />
            {errors.marca && (
              <p className="text-red-500 text-xs">{errors.marca}</p>
            )}
          </div>
          <div className="mt-2 w-1/2">
            <label htmlFor="precio">Precio</label>
            <input
              className={`bg-white w-full p-2 text-center mt-2 rounded-md border ${errors.precio ? "border-red-500" : "border-gray-400"
                }`}
              type="number"
              id="precio"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              placeholder="Precio"
            />
            {errors.precio && (
              <p className="text-red-500 text-xs">{errors.precio}</p>
            )}
          </div>
        </div>
        {/* Campo de Descripción */}
        <div className="mt-1">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            className={`bg-white w-full p-2 mt-2 rounded-md border ${errors.descripcion ? "border-red-500" : "border-gray-400"
              }`}
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Descripción del producto"
            rows="4"
          />
          {errors.descripcion && (
            <p className="text-red-500 text-xs">{errors.descripcion}</p>
          )}
        </div>
        <button
          type="submit"
          className="p-4 shadow-lg bg-blue-300 text-gray-900 rounded-md mt-2"
        >
          {product ? "Editar producto" : "Crear producto"}
        </button>
      </form>
    </div>
  );
}
