import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Carrousel = ({ carruselData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    if (carruselData.length > 0) {
      // Ordenar los datos de acuerdo a la propiedad 'seccion'
      const sortedData = carruselData
        .sort((a, b) => a.seccion - b.seccion)
        .map(data => ({
          ...data,
          imageUrl: data.imageUrl,
          texto: data.texto
        }));
      setSlides(sortedData);
    }
  }, [carruselData]);

  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % slides.length);
      }, 6000); // Cambia cada 6 segundos
      return () => clearInterval(interval);
    }
  }, [slides]);

  if (slides.length === 0) {
    return (
      <div className="w-full h-[500px]">
        <div className="w-full h-full bg-primary flex justify-center items-center">
          <h1 className="text-7xl text-gray-50 italic text-center">Avío mercado Itinerante</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] relative">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`w-full h-full absolute top-0 left-0 transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: `url(${slide.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="w-full h-full flex justify-left items-center bg-black bg-opacity-50 ">
            <h1 className="text-4xl text-white italic text-center p-5">{slide.texto}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carrousel;
