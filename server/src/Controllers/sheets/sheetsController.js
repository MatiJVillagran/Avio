require("dotenv").config();
const { google } = require("googleapis");
const { handleImageUpload } = require("./handleImageUpload");
// const path = require("path");

async function authorize() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      type: "service_account",
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
      auth_uri: process.env.GOOGLE_AUTH_URI,
      token_uri: process.env.GOOGLE_TOKEN_URI,
      auth_provider_x509_cert_url:
        process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
      universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const authClient = await auth.getClient();
  return authClient;
}

async function getSheetData(auth) {
  try {
    const sheets = google.sheets({ version: "v4", auth });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Productos!A2:J",
    });
    const rows = res.data.values || [];
    let lastId = 0;
    if (rows.length > 0) {
      lastId = parseInt(rows[rows.length - 1][0]);
    }

    const products = rows.map((row) => ({
      id: row[0],
      categoria: row[1],
      nombre: row[2],
      marca: row[3],
      medida: row[4],
      stock: parseInt(row[5]),
      precio: parseInt(row[6]),
      url: row[7],
      sku: row[8],
      publicado: row[9],
    }));

    return { products, lastId };
  } catch (error) {
    console.log({ error: error.message });
  }
}

async function getSheetDataById(id, auth) {
  try {
    const sheets = google.sheets({ version: "v4", auth });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Productos!A2:J",
    });
    const rows = res.data.values || [];

    const products = rows.map((row) => ({
      id: row[0],
      categoria: row[1],
      nombre: row[2],
      marca: row[3],
      medida: row[4],
      cantidad: row[5],
      precio: row[6],
      url: row[7],
      sku: row[8],
      publicado: row[9],
    }));

    const product = products.find((product) => product.id === id.toString());

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    return product;
  } catch (error) {
    console.log({ error: error.message });
    throw error;
  }
}


function generateSKU(category, name, color, count) {
  const categoryInitial = category.charAt(0).toLowerCase();
  const nameInitial = name.charAt(0).toLowerCase();
  const colorInitial = color.charAt(0).toLowerCase();
  const skuNumber = String(count).padStart(4, "0");
  return `${categoryInitial}-${nameInitial}-${colorInitial}-${skuNumber}`;
}

async function appendRow(auth, rowData) {
  const sheets = google.sheets({ version: "v4", auth });
  const { rows, lastId } = await getSheetData(auth);
  const newId = lastId + 1;
  const { categoria, nombre, marca, medida, cantidad, precio, url } = rowData;
  const sku = generateSKU(categoria, nombre, marca, newId);
  const urlString = Array.isArray(url) ? url.join(", ") : url;
  const publicadoValue = "no"; // Nueva variable para el valor de publicado
  const newRow = [
    newId,
    categoria,
    nombre,
    marca,
    medida,
    cantidad,
    precio,
    urlString,
    sku,
    publicadoValue, // Usar la nueva variable aquí
  ];
  const res = await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: "Productos!A2:J",
    valueInputOption: "RAW",
    resource: {
      values: [newRow],
    },
  });
  return res.data.updates;
}

async function updateRow(auth, rowData) {
  const sheets = google.sheets({ version: "v4", auth });

  // Obtener los datos actuales de la hoja
  const { products } = await getSheetData(auth);

  // Buscar el índice de la fila correspondiente usando el ID
  const rowIndex = products.findIndex((product) => product.id === rowData.id);

  // Lanzar un error si el ID no se encuentra
  if (rowIndex === -1) {
    throw new Error("ID no encontrado");
  }

  // Convertir el array de URLs en una cadena, si es necesario
  const urlString = Array.isArray(rowData.url)
    ? rowData.url.join(", ")
    : rowData.url;

  // Construir la fila actualizada con los datos de rowData
  const updatedRow = [
    rowData.id,
    rowData.categoria,
    rowData.nombre,
    rowData.marca,
    rowData.medida,
    rowData.cantidad,
    rowData.precio,
    urlString,
    rowData.sku,
    rowData.publicado,
  ];

  // Actualizar la fila en la hoja de cálculo
  const res = await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: `Productos!A${rowIndex + 2}:J${rowIndex + 2}`,
    valueInputOption: "RAW",
    resource: {
      values: [updatedRow],
    },
  });

  return res.data;
}

async function registerSale(auth, data) {
  try {
    const { productos, cliente, formaPago, envio } = data;

    console.log(cliente);

    const sheets = google.sheets({ version: "v4", auth });

    // Obtener la última fila para determinar el ID más reciente
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Ventas!A:A", // Ajusta esto si tu ID no está en la columna A
    });

    const rows = response.data.values;
    let lastId = 0;

    if (rows && rows.length > 1) {
      lastId = rows.length - 1;
    }

    const newId = lastId + 1;

    const currentDate = new Date().toLocaleDateString('en-CA', {
      timeZone: 'America/Argentina/Buenos_Aires',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }); // YYYY-MM-DD

    // Verifica si cliente.id existe, de lo contrario, asigna "Panel de control"
    const clientId = cliente.id ? cliente.id : "Panel de control";

    const ventaData = productos.map((prod) => [
      newId,
      prod.id,
      clientId,               // Usamos clientId en lugar de cliente.id
      cliente.nombre,
      prod.sku,
      prod.cantidad,
      prod.medida,
      prod.marca,
      prod.precio,
      formaPago,
      prod.cantidad * prod.precio,
      currentDate,
      envio,
    ]);

    // Append the data to the spreadsheet
    const res = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Ventas!A2:M",
      valueInputOption: "RAW",
      resource: {
        values: ventaData,
      },
    });

    for (const prod of productos) {
      const amount = parseInt(prod.cantidad);
      if (amount > 0) {
        await decreaseStock(auth, prod.id, amount);
      }
    }

    return { message: "Venta registrada exitosamente", data: res.data };
  } catch (error) {
    console.error("Error registrando la venta:", error);
    throw new Error("Error registrando la venta");
  }
}


async function getSaleDataUnitiInfo(auth, id) {
  try {
    const sheets = google.sheets({ version: "v4", auth });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Ventas!A2:M",
    });
    const rows = res.data.values || [];

    // Filtrar las ventas con el id correspondiente y mapear a objetos
    const sales = rows
      .filter((row) => row[0] === id.toString())
      .map((row) => ({
        id: row[0],
        idProducto: row[1],
        cliente: row[2],
        nombre: row[3],
        sku: row[4],
        cantidad: row[5],
        medida: row[6],
        marca: row[7],
        subtotal: row[8],
        pago: row[9],
        total: row[10],
        fecha: row[11],
        envio: row[12],
      }));

    return sales;
  } catch (error) {
    console.log({ error: error.message });
    throw error;
  }
}

async function getSaleData(auth) {
  try {
    const sheets = google.sheets({ version: "v4", auth });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Ventas!A2:M",
    });
    const rows = res.data.values || [];
    let lastId = 0;
    if (rows.length > 0) {
      lastId = parseInt(rows[rows.length - 1][0]);
    }

    const salesMap = {};

    rows.forEach((row) => {
      const id = row[0];
      if (!salesMap[id]) {
        salesMap[id] = {
          id: row[0],
          idProducto: row[1],
          cliente: row[2],
          nombre: row[3],
          sku: row[4],
          cantidad: parseInt(row[5]),
          medida: row[6],
          marca: row[7],
          subtotal: parseFloat(row[8]),
          pago: row[9],
          total: parseFloat(row[10]),
          fecha: row[11],
          envio: row[12],
        };
      } else {
        salesMap[id].cantidad += parseInt(row[5]);
        salesMap[id].subtotal += parseFloat(row[8]);
        salesMap[id].total += parseFloat(row[10]);
      }
    });

    const salesData = Object.values(salesMap);

    return { salesData, lastId };
  } catch (error) {
    console.log({ error: error.message });
  }
}

async function getSalesByDate(auth, date) {
  try {
    const sheets = google.sheets({ version: "v4", auth });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Ventas!A2:L", // Ajusta el rango según tu hoja de ventas
    });

    const rows = res.data.values || [];

    // Filtrar las ventas que coinciden con la fecha
    const salesForDate = rows.filter((row) => row[10] === date).map((row) => row[0]);

    return salesForDate;
  } catch (error) {
    console.error("Error obteniendo ventas por fecha:", error);
    throw new Error("Error obteniendo ventas por fecha");
  }
}

async function getSaleByUserId(auth, uid) {
  try {
    const sheets = google.sheets({ version: "v4", auth });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Ventas!A2:M", // Ajusta el rango según tu hoja de ventas
    });

    const rows = res.data.values || [];

    // Filtrar las ventas que coinciden con el uid en la columna "cliente"
    const salesForUser = rows.filter((row) => row[2] === uid);

    // Obtener la información del producto para cada venta
    const salesData = await Promise.all(
      salesForUser.map(async (row) => {
        const product = await getSheetDataById(Number(row[1]), auth); // Convertir productId a número
        return {
          id: row[0],
          productId: row[1],
          clientId: row[2],
          nombre: row[3],
          sku: row[4],
          quantity: row[5],
          measure: row[6],
          marca: row[7],
          price: row[8],
          paymentMethod: row[9],
          totalPrice: row[10],
          date: row[11],
          shipping: row[12],
          product, // Añadir la información del producto
        };
      })
    );

    return salesData;
  } catch (error) {
    console.error("Error obteniendo ventas por UID:", error);
    throw new Error("Error obteniendo ventas por UID");
  }
}

async function getSaleByUserName(auth, nombreCliente) {
  try {
    const sheets = google.sheets({ version: "v4", auth });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Ventas!A2:M", // Ajusta el rango según tu hoja de ventas
    });

    const rows = res.data.values || [];

    // Convertir el nombre del cliente buscado a minúsculas para comparación
    const nombreClienteLowerCase = nombreCliente.toLowerCase();

    // Filtrar las ventas que coinciden con el nombre del cliente (insensible a mayúsculas/minúsculas)
    const salesForUser = rows.filter((row) => row[3] && row[3].toLowerCase() === nombreClienteLowerCase);

    // Crear un mapa para unificar las ventas por el mismo ID
    const salesMap = {};

    // Recorrer las filas filtradas para agrupar las ventas por ID
    for (const row of salesForUser) {
      const id = row[0];

      if (!salesMap[id]) {
        salesMap[id] = {
          id: row[0],
          idProducto: row[1],
          cliente: row[2],
          nombre: row[3],
          sku: row[4],
          cantidad: parseInt(row[5]),
          medida: row[6],
          marca: row[7],
          subtotal: parseFloat(row[8]),
          pago: row[9],
          total: parseFloat(row[10]),
          fecha: row[11],
          envio: row[12],
          productos: [], // Inicializamos un arreglo de productos si necesitas agregar más detalles
        };
      } else {
        // Si la venta ya está en el mapa, sumamos las cantidades y subtotales
        salesMap[id].cantidad += parseInt(row[5]);
        salesMap[id].subtotal += parseFloat(row[8]);
        salesMap[id].total += parseFloat(row[10]);
      }

      // Añadir la información del producto si es necesario
      const product = await getSheetDataById(Number(row[1]), auth); // Convertir productId a número
      salesMap[id].productos.push(product); // Añadir al arreglo de productos
    }

    // Convertir el mapa a un arreglo de ventas unificadas
    const salesData = Object.values(salesMap);

    return salesData;
  } catch (error) {
    console.error("Error obteniendo ventas por nombre de cliente:", error);
    throw new Error("Error obteniendo ventas por nombre de cliente");
  }
}

async function increaseStock(auth, productId, amount) {
  const sheets = google.sheets({ version: "v4", auth });
  const { products } = await getSheetData(auth);
  const rowIndex = products.findIndex((row) => row.id === productId);
  if (rowIndex === -1) {
    throw new Error("ID no encontrado");
  }
  // Convertir cantidad a número y sumarle la cantidad a aumentar
  const currentAmount = parseInt(products[rowIndex].cantidad) || 0;
  products[rowIndex].cantidad = currentAmount + amount;

  const res = await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: `Productos!A${rowIndex + 2}:J${rowIndex + 2}`,
    valueInputOption: "RAW",
    resource: {
      values: [Object.values(products[rowIndex])],
    },
  });
  return res.data;
}

async function decreaseStock(auth, productId, amount) {
  const sheets = google.sheets({ version: "v4", auth });
  const { products } = await getSheetData(auth);
  const rowIndex = products.findIndex((row) => row.id === productId);
  if (rowIndex === -1) {
    throw new Error("ID no encontrado");
  }
  // Convertir cantidad a número y restarle la cantidad a disminuir
  const currentAmount = parseInt(products[rowIndex].stock) || 0;
  products[rowIndex].stock = currentAmount - amount;

  // Asegúrate de que solo se escriban las columnas A:J
  const updatedRow = Object.values(products[rowIndex]).slice(0, 10);

  const res = await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: `Productos!A${rowIndex + 2}:J${rowIndex + 2}`,
    valueInputOption: "RAW",
    resource: {
      values: [updatedRow],
    },
  });
  return res.data;
}
async function getProductsByCategory(auth, category) {
  try {
    const { products } = await getSheetData(auth);

    // Normaliza y elimina espacios en blanco de la categoría recibida
    const trimmedCategory = category.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");


    // Filtra los productos basándose en la categoría normalizada
    const filteredProducts = products.filter(
      (product) =>
        product.categoria.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === trimmedCategory
    );

    // Si no se encuentran productos, lanzar un error personalizado
    if (filteredProducts.length === 0) {
      throw new Error("Producto no encontrado");
    }

    return { products: filteredProducts };
  } catch (error) {
    console.log({ error: error.message });
    throw new Error(error.message);
  }
}


async function getAllCategories(auth) {
  try {
    const { products } = await getSheetData(auth);

    const normalizedCategories = products
      .filter((product) => product.publicado !== "no") // Filtrar productos no publicados
      .map((product) =>
        product.categoria.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      );

    const categories = [...new Set(normalizedCategories)];

    return categories;
  } catch (error) {
    console.log({ error: error.message });
    throw new Error(error.message);
  }
}


async function getCategoriesDashboard(auth) {
  try {
    const { products } = await getSheetData(auth);

    // Extrae todas las categorias de los productos
    const normalizedCategories = products.map((product) =>
      product.categoria
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
    );

    const categories = [...new Set(normalizedCategories)];

    return categories;
  } catch (error) {
    console.log({ error: error.message });
    throw new Error(error.message);
  }
}



async function getAllMarcas(auth) {
  try {
    const { products } = await getSheetData(auth);

    const marcas = [...new Set(
      products
        .filter((product) => product.publicado !== "no") // Filtrar productos no publicados
        .map((product) =>
          product.marca.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        )
    )];

    return marcas;
  } catch (error) {
    console.log({ error: error.message });
    throw new Error(error.message);
  }
}


async function getProductsByMarca(auth, marca) {
  try {
    const { products } = await getSheetData(auth);

    const trimmedMarca = marca.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const filteredProducts = products.filter(
      (product) =>
        product.marca.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === trimmedMarca
    );

    if (filteredProducts.length === 0) {
      throw new Error("Producto no encontrado");
    }

    return { products: filteredProducts };
  } catch (error) {
    console.log({ error: error.message });
    throw new Error(error.message);
  }
}

async function getProductsBySearch(auth, searchTerm) {
  try {
    const { products } = await getSheetData(auth);

    // Normaliza y elimina espacios en blanco del término de búsqueda recibido
    const trimmedSearchTerm = searchTerm.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Filtra los productos basándose en una coincidencia parcial del término de búsqueda
    const filteredProducts = products.filter((product) =>
      product.nombre &&
      product.nombre.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(trimmedSearchTerm)
    );

    // Si no se encuentran productos, lanzar un error personalizado
    if (filteredProducts.length === 0) {
      throw new Error("Producto no encontrado");
    }

    return { products: filteredProducts };
  } catch (error) {
    console.log({ error: error.message });
    throw new Error(error.message);
  }
}



async function deleteRowById(auth, id) {
  const sheets = google.sheets({ version: "v4", auth });

  // Obtener todos los datos de la hoja
  const getRows = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: "Productos!A:I", // Ajusta el rango según sea necesario
  });

  const rows = getRows.data.values;
  let rowIndexToDelete = null;

  // Encontrar la fila con el ID proporcionado
  for (let i = 0; i < rows.length; i++) {
    if (rows[i][0] == id) {
      // Asumiendo que la columna ID es la primera (A)
      rowIndexToDelete = i;
      break;
    }
  }

  if (rowIndexToDelete === null) {
    throw new Error("ID not found");
  }

  // Eliminar la fila encontrada
  const requests = [
    {
      deleteDimension: {
        range: {
          sheetId: 0, // Asegúrate de que este sea el ID correcto de la hoja
          dimension: "ROWS",
          startIndex: rowIndexToDelete,
          endIndex: rowIndexToDelete + 1,
        },
      },
    },
  ];

  const res = await sheets.spreadsheets.batchUpdate({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    resource: {
      requests,
    },
  });

  return res.data;
}

async function deleteSalesById(auth, id) {
  const sheets = google.sheets({ version: "v4", auth });

  // Obtener todos los datos de la hoja
  const getRows = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: "Ventas!A:K", // Ajusta el rango según sea necesario
  });

  const rows = getRows.data.values;
  let rowsToDelete = [];

  // Encontrar las filas con el ID proporcionado
  for (let i = 0; i < rows.length; i++) {
    if (rows[i][0] == id) {
      // Asumiendo que la columna ID es la primera (A)
      rowsToDelete.push(i);
    }
  }

  if (rowsToDelete.length === 0) {
    throw new Error("ID not found");
  }

  console.log("rowsToDelete: ", rowsToDelete);

  // Crear solicitudes de eliminación para cada fila encontrada
  const requests = rowsToDelete.map((rowIndex) => ({
    deleteDimension: {
      range: {
        sheetId: 0, // Asegúrate de que este sea el ID correcto de la hoja
        dimension: "ROWS",
        startIndex: rowIndex,
        endIndex: rowIndex + 1,
      },
    },
  }));

  // Las solicitudes deben ser enviadas en orden inverso para evitar conflictos de índice
  requests.reverse();

  const res = await sheets.spreadsheets.batchUpdate({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    resource: {
      requests,
    },
  });

  return res.data;
}

async function activeProductById(auth, id) {
  const sheets = google.sheets({ version: "v4", auth });

  // Obtener todos los datos de la hoja
  const getRows = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: "Productos!A:J", // Ajusta el rango para incluir hasta la columna J
  });

  const rows = getRows.data.values;
  let rowIndexToUpdate = null;

  // Encontrar la fila con el ID proporcionado
  for (let i = 0; i < rows.length; i++) {
    if (rows[i][0] == id) {
      // Asumiendo que la columna ID es la primera (A)
      rowIndexToUpdate = i;
      break;
    }
  }

  if (rowIndexToUpdate === null) {
    throw new Error("ID not found");
  }

  // Obtener el valor actual de la columna "Publicado" (columna J, índice 9)
  const currentPublishedValue = rows[rowIndexToUpdate][9];
  const newPublishedValue = currentPublishedValue === "si" ? "no" : "si"; // Alternar entre "si" y "no"

  // Actualizar la celda con el nuevo valor
  const updateResponse = await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: `Productos!J${rowIndexToUpdate + 1}`, // J es la columna 10, sumamos 1 al índice para la referencia en Sheets
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[newPublishedValue]],
    },
  });

  // Determinar el estado de "Publicado" y enviar el mensaje correspondiente
  const statusMessage =
    newPublishedValue === "si" ? "publicado" : "no publicado";

  return {
    message: `El producto cambio a ${statusMessage}.`,
    updateResponse: updateResponse.data,
  };
}

async function getCashFlow(auth) {
  try {
    const sheets = google.sheets({ version: "v4", auth });

    // Obtener los datos del flujo de caja
    const resCashFlow = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "FlujoDeCaja!A2:F",  // Incluye la columna F para "Caja Final"
    });

    const rowsCashFlow = resCashFlow.data.values || [];
    let lastId = 0;
    let saldoAcumulado = 0;  // Para llevar el registro del saldo acumulado

    if (rowsCashFlow.length > 0) {
      lastId = parseInt(rowsCashFlow[rowsCashFlow.length - 1][0]);
    }

    const cashFlowData = rowsCashFlow.map((row) => {
      const tipo = row[1];
      const monto = parseFloat(row[2]);

      // Calcular saldo acumulado basado en el tipo de movimiento (Ingreso/Gasto)
      if (tipo === "Ingreso") {
        saldoAcumulado += monto;
      } else if (tipo === "Gasto") {
        saldoAcumulado -= monto;
      }

      return {
        id: row[0],
        tipo: tipo,
        monto: monto,
        descripcion: row[3],
        fecha: row[4],
        cajaFinal: saldoAcumulado,  // Caja final acumulada
      };
    });

    // Obtener los datos de la hoja de ventas
    const resVentas = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Ventas!A2:M",  // Asumiendo que las columnas de interés están en A2:K
    });

    const rowsVentas = resVentas.data.values || [];

    // Añadir las ventas al flujo de caja como ingresos
    const ventasData = rowsVentas.map((ventaRow, index) => {
      const id = lastId + index + 1;  // Incrementar el ID para las nuevas filas
      const subtotal = parseFloat(ventaRow[8]);  // Subtotal de la venta
      const total = parseFloat(ventaRow[10]);  // Total de la venta
      const descripcion = `Venta Producto: ${ventaRow[4]}, Cliente: ${ventaRow[3]}`;  // SKU y Cliente
      const fecha = ventaRow[11];  // Fecha de la venta

      // Sumar el total de la venta al saldo acumulado
      saldoAcumulado += total;

      return {
        id: id.toString(),
        tipo: "Ingreso",  // Todas las ventas se consideran como ingresos
        monto: total,
        descripcion: descripcion,
        fecha: fecha,
        cajaFinal: saldoAcumulado,  // Caja final actualizada
      };
    });

    // Combinar flujo de caja existente con las ventas
    const allCashFlowData = [...cashFlowData, ...ventasData];

    return { cashFlowData: allCashFlowData, lastId: lastId + rowsVentas.length };
  } catch (error) {
    console.log({ error: error.message });
  }
}

// Controlador modificado para devolver solo la nueva entrada
async function addCashFlowEntry(auth, data) {
  try {
    const { tipo, monto, descripcion, fecha } = data;
    const sheets = google.sheets({ version: "v4", auth });

    // Obtener la última fila para determinar el ID más reciente
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "FlujoDeCaja!A:A",
    });

    const rows = response.data.values || [];
    let lastId = rows.length > 1 ? parseInt(rows[rows.length - 1][0], 10) || 0 : 0;

    let saldoAcumulado = 0;
    if (rows.length > 1) {
      const lastRow = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEETS_ID,
        range: `FlujoDeCaja!F${rows.length}`,
      });

      saldoAcumulado = lastRow.data.values && lastRow.data.values[0] ? parseFloat(lastRow.data.values[0][0]) || 0 : 0;
    }

    const newSaldoAcumulado = tipo === "Ingreso" ? saldoAcumulado + parseFloat(monto) : saldoAcumulado - parseFloat(monto);
    const newRow = [lastId + 1, tipo, parseFloat(monto), descripcion, fecha, newSaldoAcumulado];

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "FlujoDeCaja!A:F",
      valueInputOption: "RAW",
      resource: { values: [newRow] },
    });

    return { id: newRow[0], tipo, monto, descripcion, fecha, cajaFinal: newSaldoAcumulado };
  } catch (error) {
    console.error("Error agregando el movimiento:", error);
    throw new Error("Error agregando el movimiento al flujo de caja");
  }
}


async function createSectionEntry(req, res) {
  try {
    // Autorizar Google Sheets
    const auth = await authorize();
    const sheets = google.sheets({ version: "v4", auth });

    // Obtener el último ID para determinar el ID más reciente
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Imagenes!A:A", // Ajusta esto si tu ID no está en la columna A
    });

    const rows = response.data.values;
    let lastId = 0;

    // Si hay más de una fila (considerando que la primera podría ser el encabezado)
    if (rows && rows.length > 1) {
      lastId = rows.length - 1; // La última fila con datos
    }

    const secciones = req.body; // Recibe el array de secciones
    console.log("secciones", req.body);


    // Iterar sobre las secciones y agregar cada una a la hoja de cálculo
    for (const seccion of secciones) {
      const { texto, imagen } = seccion;

      // Validar que el texto tenga menos de 200 caracteres
      if (texto.length > 200) {
        return res.status(400).json({ message: "El texto no debe exceder los 200 caracteres." });
      }

      // // Subir la imagen a Cloudinary si existe
      // const imageUrl = imagen ? await handleImageUpload(imagen) : null;

      // Formatear los datos para agregarlos a la hoja de cálculo
      const newRow = [
        ++lastId, // Incrementar el ID
        seccion.seccion, // Número o nombre de la sección
        texto, // Texto asociado
        imagen // URL de la imagen en Cloudinary
      ];

      // Guardar la nueva fila en la hoja de cálculo de Google Sheets
      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEETS_ID,
        range: "Imagenes!A2:D", // Ajustar el rango según tu estructura de datos
        valueInputOption: "RAW",
        resource: {
          values: [newRow],
        },
      });
    }

    // Responder con el resultado
    res.status(200).json({ message: "Secciones creadas exitosamente" });

  } catch (error) {
    console.error("Error creando la entrada:", error);
    res.status(500).json({ message: "Error creando las secciones", error: error.message });
  }
}



async function getSectionEntries(req, res) {
  try {
    // Autorizar Google Sheets
    const auth = await authorize();

    // Obtener los datos de la hoja "Imagenes"
    const sheets = google.sheets({ version: "v4", auth });
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID, // ID de tu hoja de cálculo
      range: "Imagenes!A2:D", // Rango desde donde quieras obtener los datos (omitir encabezados)
    });

    const rows = result.data.values;

    // Verificar si hay datos en la hoja
    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: "No se encontraron entradas en la hoja de 'Imagenes'." });
    }

    // Formatear los datos en un array de objetos
    const formattedData = rows.map(row => ({
      id: row[0],       // ID
      seccion: row[1],  // Sección
      texto: row[2],    // Texto
      imageUrl: row[3], // URL de la imagen
    }));

    // Devolver los datos formateados
    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error obteniendo las entradas:", error.message);
    res.status(500).json({ message: "Error obteniendo las entradas", error: error.message });
  }
}

async function updateSectionEntry(req, res) {
  try {
    // Autorizar Google Sheets
    const auth = await authorize();
    const sheets = google.sheets({ version: "v4", auth });

    // Obtener los datos actuales para comparar las secciones
    const existingDataRes = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Imagenes!A2:D", // Asume que las filas de datos comienzan en la fila 2
    });

    const existingRows = existingDataRes.data.values || [];

    // Obtener el arreglo de secciones a actualizar
    const secciones = req.body; // Se espera un arreglo de objetos con seccion, texto e imagen
    console.log("secciones a actualizar", secciones);

    // Recorrer los datos entrantes para verificar si deben actualizarse
    for (const seccion of secciones) {
      const { seccion: seccionNombre, texto, imagen } = seccion;

      // Validar que el texto tenga menos de 200 caracteres
      if (texto.length > 200) {
        return res.status(400).json({ message: "El texto no debe exceder los 200 caracteres." });
      }

      // Buscar si ya existe un registro con la misma 'seccion'
      const existingRowIndex = existingRows.findIndex(row => row[1] === seccionNombre);

      if (existingRowIndex !== -1) {
        // Si se encuentra un registro con la misma sección, se actualizan el texto e imagen
        const rowIndex = existingRowIndex + 2; // Ajustar por el offset de fila (A2 empieza en índice 2)
        await sheets.spreadsheets.values.update({
          spreadsheetId: process.env.GOOGLE_SHEETS_ID,
          range: `Imagenes!A${rowIndex}:D${rowIndex}`,
          valueInputOption: "RAW",
          resource: {
            values: [[existingRows[existingRowIndex][0], seccionNombre, texto, imagen || existingRows[existingRowIndex][3]]], // Mantener ID y actualizar texto e imagen
          },
        });
      } else {
        // Si no existe la 'seccion', se añade como nuevo
        const newId = existingRows.length + 1; // Generar un nuevo ID
        await sheets.spreadsheets.values.append({
          spreadsheetId: process.env.GOOGLE_SHEETS_ID,
          range: "Imagenes!A2:D",
          valueInputOption: "RAW",
          resource: {
            values: [[newId, seccionNombre, texto, imagen]], // Nuevo ID, nombre de sección, texto y URL de la imagen
          },
        });
      }
    }

    return res.status(200).json({ message: "Secciones actualizadas exitosamente" });
  } catch (error) {
    console.error("Error actualizando las entradas:", error);
    res.status(500).json({ message: "Error actualizando las secciones", error: error.message });
  }
}



module.exports = {
  authorize,
  getSheetData,
  getSheetDataById,
  appendRow,
  updateRow,
  deleteRowById,
  registerSale,
  getSaleData,
  getSaleDataUnitiInfo,
  getSalesByDate,
  increaseStock,
  decreaseStock,
  getProductsByCategory,
  getAllCategories,
  getCategoriesDashboard,
  deleteSalesById,
  getSaleByUserId,
  getSaleByUserName,
  getCashFlow,
  addCashFlowEntry,
  getAllMarcas,
  getProductsByMarca,
  activeProductById,
  createSectionEntry,
  getSectionEntries,
  updateSectionEntry,
  getProductsBySearch
};