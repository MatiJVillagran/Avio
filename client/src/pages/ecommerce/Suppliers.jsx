import { useSelector } from "react-redux";
import Navigation from "../../componentes/Ecommerce/Nav/Navigation";

const Suppliers = () => {
  const allMarcas = useSelector((state) => state.sheets.marcas);

  return (
    <div className="w-full bg-primary min-h-screen">
      <Navigation />
      <div className="flex flex-col items-center p-2 space-y-6">
        <h1 className="text-white font-extrabold text-4xl mb-8">PRODUCTORES</h1>
        <div className="flex overflow-x-auto scroll-smooth space-x-6 w-full mt-6 px-8 py-3">
          {allMarcas.map((marca, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 w-64 h-64 hover:scale-105 transition-all duration-300 bg-transparent mb-8"
            >
              {/* Imagen */}
              <img
                src="https://i.ibb.co/PZDhTHm/Dibujos-Mariana-PNG-2.png"
                alt={marca}
                className="w-full h-full object-fill bg-transparent"
              />
              {/* Nombre de la marca */}
              <p className="absolute inset-0 flex items-center justify-center text-yellow-400 font-bold text-lg md:text-xl bg-black bg-opacity-10 rounded-full">
                {marca}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Suppliers;
