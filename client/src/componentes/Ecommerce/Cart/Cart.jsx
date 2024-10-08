import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { cleanCart, createSale, removeFromCart } from "../../../redux/actions/actions";
import { useNavigate } from "react-router-dom";

const Cart = ({ product, calcularTotal, usuario }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formaPago, setFormaPago] = useState("");
  const [envio, setEnvio] = useState("");
  const [formCliente, setFormCliente] = useState({
    nombre: usuario.name || "",
    correo: usuario.email || "",
    id: usuario.uid || "",
    provincia: usuario.provincia || "",
    direccion: usuario.direccion || "",
    cp: usuario.cp || "",
    celular: "",
  });

  const handleFormaPagoChange = (forma) => {
    setFormaPago(forma);
  };

  const handleEnvioChange = (envio) => {
    setEnvio(envio);
  };

  const handleFormClienteChange = (e) => {
    const { name, value } = e.target;
    setFormCliente({
      ...formCliente,
      [name]: value,
    });
  };

  const handleCreateVenta = () => {
    const venta = {
      productos: product.map((prod) => ({
        id: prod.id,
        sku: prod.sku,
        nombre: prod.nombre,
        medida: prod.medida,
        marca: prod.marca,
        precio: prod.precio,
        cantidad: prod.cantidad,
      })),
      total: calcularTotal(),
      formaPago,
      envio,
      cliente: formCliente,
    };

    
    

    if (venta.formaPago === "") {
      toast.error("Falta forma de pago");
    } else if (venta.envio === "") {
      toast.error("Falta envio");
    }else if (venta.productos.length === 0) {
      toast.error("La canasta está vacía");
    } else if (venta.cliente.nombre.trim() === "") {
      toast.error("Falta nombre del cliente");
    } else {
      toast.success("Pedido creado exitosamente...");
     
      dispatch(createSale(venta));
      dispatch(cleanCart());
      setTimeout(() => {
        navigate("/")
      },3000)
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center bg-primary">
      <div className="bg-gray-50 h-screen text-center shadow-md p-5 rounded-xl w-full lg:w-2/3 flex flex-col lg:ml-2 mt-2">
        <div className="flex justify-start">
          <button
            className="flex gap-2 border border-gray-400 p-2 active:translate-y-[1px] hover:shadow-lg rounded-md"
            onClick={() => navigate("/")}
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
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>
            <span>Volver</span>
          </button>
          <h1 className="text-xl font-bold flex-1">Canasta de compras</h1>
        </div>

        <div
          className={`border border-gray-500 p-2 mt-4 rounded-md ${product.length > 0
              ? "overflow-y-scroll"
              : "h-full flex justify-center items-center"
            }`}
        >
          {product?.length > 0 ? (
            product?.map((prod, i) => {
              const imagenes = prod?.url?.split(",")[0];
              return (
                <div
                  key={i}
                  className="md:flex items-center py-2 border-t border-gray-500 rounded-md bg-white shadow-sm p-4"
                >
                  <div className="md:w-1/3 w-32 h-32 flex-shrink-0">
                    <img
                      key={i}
                      src={imagenes}
                      alt="Producto"
                      className="h-full w-full rounded-md object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 flex flex-col justify-center p-4 text-left">
                    <p className="text-base font-bold leading-none text-gray-800">
                      {prod.nombre}
                    </p>
                    {prod.medida && (
                      <p className="text-sm leading-3 text-gray-600 pt-2">
                        <span className="font-bold">Medida:</span> {prod.medida}
                      </p>
                    )}
                    <p className="text-sm leading-3 text-gray-600 py-2">
                      <span className="font-bold">Marca:</span> {prod.marca}
                    </p>
                    <p className="text-sm leading-3 text-gray-600 py-2">
                      <span className="font-bold">Cantidad:</span> {prod.cantidad}
                    </p>
                    <div className="flex items-center justify-between pt-4">
                      <p className="text-xl font-semibold text-gray-800">
                        ${prod.precio * prod.cantidad},00
                      </p>
                      <button
                        onClick={() => handleRemove(prod.id)}
                        className="flex items-center justify-center p-2 hover:shadow-md border border-red-500 rounded-full text-red-500 cursor-pointer transition ease-in-out duration-200 hover:bg-red-100"
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
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>

                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-center">
              Canasta vacía, llenala y podrás realizar el pedido
            </p>
          )}
        </div>
      </div>

      {/* Resumen */}
      <div className="bg-gray-100 text-center shadow-md p-6 rounded-xl w-full lg:w-1/3 m-4 h-screen flex flex-col justify-between mt-4 lg:mt-6">
        <h1 className="text-xl text-black">Resumen</h1>
        <div className="p-2 lg:mt-0 -mt-12">
          <div className="mt-2 flex justify-center items-center ">
            <label className="border border-gray-300 p-2 text-center" htmlFor="nombre">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              value={formCliente.nombre}
              onChange={handleFormClienteChange}
              className="border p-2 w-full border-gray-300 rounded-md"
              placeholder="Nombre completo"
            />
          </div>
          <div className="mt-2 flex justify-center items-center">
            <label className="border border-gray-300 p-2 text-center" htmlFor="correo">
              Correo
            </label>
            <input
              type="email"
              name="correo"
              value={formCliente.correo}
              onChange={handleFormClienteChange}
              className="border p-2 w-full border-gray-300 rounded-md"
              placeholder="Email"
            />
          </div>
          <div className="mt-2 flex flex-row justify-center items-center">
            <div className="flex">
              <label className="border border-gray-300 p-2 text-center" htmlFor="provincia">
                Provincia
              </label>
              <input
                type="text"
                name="provincia"
                value={formCliente.provincia}
                onChange={handleFormClienteChange}
                className="border p-2 w-full border-gray-300 rounded-md"
                placeholder="Provincia"
              />
            </div>
            <div className="ml-2 flex">
              <label className="border border-gray-300 p-2 text-center" htmlFor="cp">
                CP
              </label>
              <input
                type="text"
                name="cp"
                value={formCliente.cp}
                onChange={handleFormClienteChange}
                className="border p-2 w-full border-gray-300 rounded-md"
                placeholder="Código Postal"
              />
            </div>
          </div>
          <div className="mt-2 flex flex-row justify-center items-center">
            <div className="flex">
              <label className="border border-gray-300 p-2 text-center" htmlFor="direccion">
                Dirección
              </label>
              <input
                type="text"
                name="direccion"
                value={formCliente.direccion}
                onChange={handleFormClienteChange}
                className="border p-2 w-full border-gray-300 rounded-md"
                placeholder="Dirección"
              />
            </div>
            <div className="ml-2 flex">
              <label className="border border-gray-300 p-2 text-center" htmlFor="celular">
                Celular
              </label>
              <input
                type="text"
                name="celular"
                value={formCliente.celular}
                onChange={handleFormClienteChange}
                className="border p-2 w-full border-gray-300 rounded-md"
                placeholder="Número de celular"
              />
            </div>
          </div>
        </div>

        <div className="p-2 lg:mt-0 -mt-14">
          <p>Forma de pago</p>
          <div className="flex gap-2 mt-2 justify-center items-center">
            <button
              onClick={() => handleFormaPagoChange("Efectivo")}
              className={`border p-2 text-gray-500 w-32 hover:bg-gray-200 shadow-md rounded-md active:translate-y-[2px] ${formaPago === "Efectivo" ? "bg-teal-300" : "border-gray-400"
                }`}
            >
              Efectivo
            </button>
            <button
              onClick={() => handleFormaPagoChange("Transferencia")}
              className={`border p-2 text-gray-500 w-32 hover:bg-gray-200 shadow-md rounded-md active:translate-y-[2px] ${formaPago === "Transferencia"
                  ? "bg-teal-400"
                  : "border-gray-400"
                }`}
            >
              Transferencia
            </button>
          </div>
        </div>
        <div className="p-2 lg:mt-0 -mt-14">
          <p>Envio</p>
          <div className="flex gap-2 mt-2 justify-center items-center">
            <button
              onClick={() => handleEnvioChange("Retiro")}
              className={`border p-2 text-gray-500 w-24 hover:bg-gray-200 shadow-md rounded-md active:translate-y-[2px] ${envio === "Retiro" ? "bg-teal-300" : "border-gray-400"
                }`}
            >
              Retiro
            </button>
            <button
              onClick={() => handleEnvioChange("Envio")}
              className={`border p-2 text-gray-500 w-24 hover:bg-gray-200 shadow-md rounded-md active:translate-y-[2px] ${envio === "Envio"
                  ? "bg-teal-400"
                  : "border-gray-400"
                }`}
            >
              Envio
            </button>
          </div>
          </div>
        {/*TOTAL*/}
        <div className="p-2 mt-4 lg:mt-12 relative sm:-top-10 -top-4">
          <p>Total: ${calcularTotal()}</p>
          <button
            onClick={handleCreateVenta}
            className="border p-2 text-white bg-tertiary w-full hover:bg-gray-700 rounded-md mt-4"
          >
            Confirmar pedido
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
