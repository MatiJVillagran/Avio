import React, { useState, useEffect } from "react";
import { tailspin } from "ldrs";

tailspin.register();

const Loader = () => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Establecer un temporizador para mostrar el mensaje después de 5 segundos (5000 ms)
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 5000); // Cambia el tiempo si es necesario

    // Limpiar el temporizador cuando el componente se desmonte
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {!showMessage ? (
        <l-tailspin size="40" stroke="5" speed="0.9" color="lightblue"></l-tailspin>
      ) : (
        <p>No se encontraron resultados</p>
      )}
    </div>
  );
};

export default Loader;
