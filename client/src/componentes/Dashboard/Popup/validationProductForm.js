const validationProductForm = (formData) => {
  let errors = {};

  // Validación de nombre
  if (formData.nombre && !formData.nombre.trim()) {
    errors.nombre = "El nombre es requerido";
  }

  // Validación de categoría
  if (formData.categoria && !formData.categoria.trim()) {
    errors.categoria = "La categoría es requerida";
  }

  // Validación de medida
  if (formData.medida && !formData.medida.trim()) {
    errors.medida = "La medida es requerida";
  }

  // Validación de cantidad
  if (formData.stock && !formData.stock.trim()) {
    errors.stock = "La cantidad es requerida";
  }

  // Validación de marca
  if (formData.marca && !formData.marca.trim()) {
    errors.marca = "La marca es requerida";
  }

    // Validación de descripcion
    if (formData.descripcion && !formData.descripcion.trim()) {
      errors.descripcion = "La descripcion es requerida";
    }

  // Asegúrate de que formData.precio sea una cadena
  const precioString = formData.precio ? formData.precio.toString() : '';
  const sanitizedPrice = precioString.replace(/,/g, '');

  if (formData.precio && !sanitizedPrice) {
    errors.precio = "El precio es requerido";
  } else if (formData.precio && !sanitizedPrice.trim()) {
    errors.precio = "El precio no puede ser solo espacios";
  } else if (formData.precio && !/^\d+(\.\d{1,2})?$/.test(sanitizedPrice)) {
    errors.precio =
      "El precio debe ser un número positivo con hasta dos decimales";
  } else if (parseFloat(sanitizedPrice) <= 0) {
    errors.precio = "El precio debe ser mayor a 0";
  }

  return errors;
};

export default validationProductForm;
