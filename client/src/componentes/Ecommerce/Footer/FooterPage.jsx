import React from "react";

function FooterPage() {
  return (
    <footer className="w-full py-8 bg-tertiary text-white">
      <div className="container mx-auto px-6 flex justify-center items-center flex-col">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/4">
            <h5 className="uppercase mb-6 font-bold">Avio</h5>
            <p className="mb-4">
              Productos agroecologicos y/u orgánicos.
            </p>
          </div>
          <div className="w-full md:w-1/4">
            <h5 className="uppercase mb-6 font-bold">Enlaces</h5>
            <ul className="mx-3 mb-4">
              <li>
                <a href="#" className="hover:underline">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/cart" className="hover:underline">
                  Tienda
                </a>
              </li>
              <li>
                <a href="/aboutUs" className="hover:underline">
                  Sobre nosotros
                </a>
              </li>

            </ul>
          </div>
          <div className="w-full md:w-1/4">
            <h5 className="uppercase mb-6 font-bold">Contacto</h5>
            <ul className="mx-2 mb-4">
              <li>
                Email:{" "}
                <a
                  href="mailto:aviomercadoagroecologico@gmail.com"
                  className="hover:underline"
                >
                aviomercadoagroecologico@gmail.com
                </a>
              </li>
              <li>
                Teléfono:{" "}
                <a href="https://wa.me/2614161558" className="hover:underline">
                  +543424093379
                </a>
              </li>
              <li>Lugar: Santa fe ciudad, CP 3000</li>
            </ul>
          </div>
          <div className="w-full md:w-1/4">
            <h5 className="uppercase mb-6 font-bold mx-3 ml-20">Seguinos</h5>
            <ul className="flex justify-center mb-4">
              <li className="mx-3">
                <a href="https://www.instagram.com/avio_mercado_itinerante?igsh=d2JyZnNhbm9jcDQw">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/768px-Instagram_icon.png"
                    alt="Instagram"
                    style={{ width: "32px", height: "32px" }}
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>

        
      </div>
    </footer>
  );
}

export default FooterPage;
