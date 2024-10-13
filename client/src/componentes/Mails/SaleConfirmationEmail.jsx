import React from "react";

const SaleConfirmationEmail = ({ data }) => {
  const { productos, cliente, envio } = data;

  // Calcular el total a abonar
  const totalAbonar = productos.reduce(
    (acc, product) => acc + product.precio * product.cantidad,
    0
  );

  return (
    <div
      style={{
        maxWidth: "32rem",
        margin: "0 auto",
        padding: "1rem",
        backgroundColor: "white",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "0.5rem",
      }}
    >
      {/* Imagen del logo redondo centrada */}
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <img
          src="https://i.ibb.co/THt2PXT/images-1.jpg" // URL de tu logo
          alt="Logo de la tienda"
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </div>

      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          textAlign: "center",
          color: "#2d3748",
        }}
      >
        ¡Gracias por tu compra, {cliente.nombre}!
      </h1>
      <p style={{ textAlign: "center", color: "#718096", marginTop: "0.5rem" }}>
        A continuación, encontrarás los detalles:
      </p>

      <div style={{ overflowX: "auto", marginTop: "1rem" }}>
        <table
          style={{
            minWidth: "100%",
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  padding: "0.5rem 1rem",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                Producto
              </th>
              <th
                style={{
                  padding: "0.5rem 1rem",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                Cantidad
              </th>
              <th
                style={{
                  padding: "0.5rem 1rem",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                Precio
              </th>
            </tr>
          </thead>
          <tbody>
            {productos.map((product, index) => (
              <tr key={index} style={{ textAlign: "center" }}>
                <td
                  style={{
                    padding: "0.5rem 1rem",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  {product.nombre}
                </td>
                <td
                  style={{
                    padding: "0.5rem 1rem",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  {product.cantidad}
                </td>
                <td
                  style={{
                    padding: "0.5rem 1rem",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  ${product.precio}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

                {/* Total a abonar */}
                <p
          style={{ textAlign: "center", color: "#718096", marginTop: "0.5rem" }}
        >
          Total a abonar:{" "}
          <strong
            style={{
              textAlign: "center",
              color: "#d98f25",
              padding: "1rem",
            }}
          >
            ${totalAbonar.toFixed(2)} {/* Muestra el total con dos decimales */}
          </strong>
        </p>

        <p
          style={{ textAlign: "center", color: "#718096", marginTop: "1rem" }}
        >
          Forma de entrega:{" "}
          <strong
            style={{
              textAlign: "center",
              color: "#d98f25",
              padding: "1rem",
            }}
          >
            {envio}
          </strong>
        </p>
        {/* Estado del pedido */}
        <p
          style={{ textAlign: "center", color: "#718096", marginTop: "0.5rem" }}
        >
          El estado de tu pedido se encuentra actualmente en:{" "}
          <strong
            style={{
              textAlign: "center",
              color: "#d98f25",
              padding: "1rem",
            }}
          >
            PENDIENTE
          </strong>
        </p>

      </div>

      <p style={{ textAlign: "center", color: "#718096", marginTop: "1rem" }}>
        Esperamos que disfrutes de tus productos. ¡Gracias por confiar en
        nosotros!
      </p>
    </div>
  );
};

export default SaleConfirmationEmail;
