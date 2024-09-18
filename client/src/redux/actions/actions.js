import CryptoJS from "crypto-js";
import intance from "../../api/axiosConfig";
import toast from "react-hot-toast";
import renderEmail from "../../componentes/Mails/renderEmail";
import renderEmailOrder from "../../componentes/Mails/renderEmailOrder";
import renderEmailOrderStateChange from "../../componentes/Mails/renderEmailOrderStateChange";

export const LOGIN_WITH_GOOGLE = "LOGIN_WITH_GOOGLE";
export const AUTHENTICATE_USER_FROM_SESSION = "AUTHENTICATE_USER_FROM_SESSION";


export const FETCH_SHEETS = "FETCH_SHEETS";
export const AUTH_SHEETS = "AUTH_SHEETS";
export const ADD_SHEET_ROW = "ADD_SHEET_ROW";
export const FETCH_PRODUCT_SHEET_BY_ID = "FETCH_PRODUCT_SHEET_BY_ID"
export const UPDATE_SHEET_ROW = "UPDATE_SHEET_ROW";
export const DELETE_SHEET_ROW = "DELETE_SHEET_ROW";

export const UPLOAD_IMAGES_SUCCESS = "UPLOAD_IMAGES_SUCCESS";
export const UPLOAD_IMAGES_FAILURE = "UPLOAD_IMAGES_FAILURE";
export const CLEAR_IMAGES = "CLEAR_IMAGES";
export const SET_CONDITION = "SET_CONDITION";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const FILTER_CATEGORY = "FILTER_CATEGOTY";
export const CLEAR_FILTER = "CLEAR_FILTER";
export const GET_COLORS = "GET_COLORS";
export const FILTER_COLOR = "FILTER_COLOR";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_CART_ITEM_QUANTITY = "UPDATE_CART_ITEM_QUANTITY";
export const CART_SENT_SUCCESS = "CART_SENT_SUCCESS";
export const CART_SENT_FAILURE = "CART_SENT_FAILURE";
export const GET_CART_SUCCESS = "GET_CART_SUCCESS";
export const GET_CART_FAILURE = "GET_CART_FAILURE";

export const CLEAN_CART = "CLEAN_CART";
export const UPDATE_CART = "UPDATE_CART";
export const DELETE_CART_ITEM_SUCCESS = "DELETE_CART_ITEM_SUCCESS";
export const DELETE_CART_ITEM_FAILURE = "DELETE_CART_ITEM_FAILURE";
export const INCREMENT_QUANTITY = "INCREMENT_QUANTITY";
export const DECREMENT_QUANTITY = "DECREMENT_QUANTITY";

export const GET_SALES = "GET_SALES";
export const GET_SALE_BY_ID = "GET_SALE_BY_ID";
export const CREATED_SALE = "CREATED_SALE";
export const DELETE_SALE_ROW = "DELETE_SALE_ROW";
export const GET_SALE_BY_USER_ID = "GET_SALE_BY_USER_ID";

export const GET_CASH_FLOW = "GET_CASH_FLOW";
export const ADD_CASH_FLOW_ENTRY = "ADD_CASH_FLOW_ENTRY";

export const CREATED_SELLER = "CREATED_SELLER";
export const AUTH_SELLER = "AUTH_SELLER";
export const FETCH_USERS = "FETCH_USERS";

export const CREATED_USER = "CREATED_USER";

export const CREATE_SECTION = "CREATE_SECTION";
export const GET_SECTION = "GET_SECTION";


//USER
export const authenticationUser = (email) => async (dispatch) => {
  try {
    const response = await intance.post(`/api/user/auth/${email}`);
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: AUTH_SELLER,
        payload: response.data,
      });
      toast.success("Usuario creado y guardado");
    }
  } catch (error) {
    console.error("Error al crear usuario:", error);
    toast.error("Error al crear usuario");
  }
};

export const createUser = (data) => async (dispatch) => {
  console.log(data);
  try {
    const response = await intance.post(`/api/user/create`, data);
    console.log(response);
    if (response.ok) {
      dispatch({
        type: CREATED_USER,
      });
      toast.success("Usuario creado y guardado");
    }
  } catch (error) {
    console.error("Error al crear usuario:", error);
    toast.error("Error al crear usuario");
  }
};

export const createSeller = (email, name, uid, role) => async (dispatch) => {
  try {
    const data = { email, name, uid, role };
    const response = await intance.post(`/api/user/seller`, data);
    if (response.ok) {
      dispatch({
        type: CREATED_SELLER,
      });
      dispatch(fetchUsers());
      toast.success("Usuario creado y guardado");
    }
  } catch (error) {
    console.error("Error al crear usuario:", error);
    toast.error("Error al crear usuario");
  }
};

export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await intance.get(`/api/user/users`);
    if (response.status === 200) {
      dispatch({
        type: FETCH_USERS,
        payload: response.data,
      });
    }
  } catch (error) {
    console.error("Error al mostrar usuario:", error);
    toast.error("Error al mostrar usuario");
  }
};

//CARRITO
export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const incrementQuantity = (productId) => ({
  type: INCREMENT_QUANTITY,
  payload: productId,
});

export const decrementQuantity = (productId) => ({
  type: DECREMENT_QUANTITY,
  payload: productId,
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const cleanCart = () => ({
  type: CLEAN_CART,
});

export const updateCartItemQuantity = (productId, quantity) => ({
  type: UPDATE_CART_ITEM_QUANTITY,
  payload: { productId, quantity },
});

export const updateCart = (updatedCart) => ({
  type: UPDATE_CART,
  payload: updatedCart,
});

//VENTAS
export const getSaleInfo = (id) => async (dispatch) => {
  try {
    const res = await intance.get(`/api/sheets/sale/${id}`);
    console.log(res);
    dispatch({
      type: GET_SALE_BY_ID,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSales = () => async (dispatch) => {
  try {
    const res = await intance.get(`/api/sheets/sale`);
    dispatch({
      type: GET_SALES,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createSale = (data) => async (dispatch) => {
  try {
    const res = await intance.post(`/api/sheets/sale`, data);
    if (res.status === 200) {
      dispatch(getSales());
      await sendEmail(data.cliente.correo, data);
      await sendEmailOrder("matiassjv@gmail.com", data);
      dispatch({
        type: CREATED_SALE,
        payload: res,
      });
      dispatch(cleanCart());
    }
  } catch (error) {
    console.log({ error: error.message });
  }
};

export const getSaleByUserID = (uid) => async (dispatch) => {
  try {

    const res = await intance.get(`/api/sheets/sales/${uid}`);
    if (res.status === 200) {
      dispatch({
        type: GET_SALE_BY_USER_ID,
        payload: res.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// FLUJO DE CAJA
// Obtener todos los movimientos de caja
export const getCashFlow = () => async (dispatch) => {
  try {
    const res = await intance.get(`/api/sheets/cashflow`);

    dispatch({
      type: GET_CASH_FLOW,
      payload: res.data, // Asegúrate que este payload coincide con la estructura de datos que esperas en tu componente
    });
  } catch (error) {
    console.error("Error obteniendo flujo de caja:", error);
    dispatch({ error: error.message });
  }
};

export const addCashFlowEntry = (entryData) => async (dispatch) => {
  try {
    const response = await intance.post("/api/sheets/cashflow/add", entryData);
    toast.success("Entrada añadida exitosamente");

    // Actualizar el estado local solo con la nueva entrada
    dispatch({
      type: ADD_CASH_FLOW_ENTRY,
      payload: response.data, // Solo la nueva entrada
    });

    // Desencadenar un fetch para obtener todo el flujo de caja actualizado (opcional)
    dispatch(getCashFlow());
  } catch (error) {
    console.error("Error añadiendo entrada:", error);
    toast.error("Error añadiendo la entrada de flujo de caja");
  }
};

//LOGIN
export const loginWithGoogle = (userInfo) => ({
  type: LOGIN_WITH_GOOGLE,
  payload: userInfo,
});

export const authenticateUserFromSession = () => {
  return (dispatch) => {
    const hashedUserInfo = sessionStorage.getItem("user");

    if (hashedUserInfo) {
      try {
        const secretKey = import.meta.env.VITE_SECRET_KEY_BYCRYPT;
        const bytes = CryptoJS.AES.decrypt(hashedUserInfo, secretKey);
        const userInfo = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        dispatch({
          type: AUTHENTICATE_USER_FROM_SESSION,
          payload: userInfo,
        });
      } catch (error) {
        console.error(
          "Error desencriptando la información del usuario:",
          error
        );
        toast.error("Error autenticando usuario");
      }
    }
  };
};

//UPLOAD IMAGE
export const uploadImages = (formData) => async (dispatch) => {
  try {
    const response = await intance.post(`/api/sheets/images`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response.status === 200) {
      toast.success("Imagen cargada");
      dispatch({ type: UPLOAD_IMAGES_SUCCESS, payload: response.data.url });
    } else {
      toast.error("No se pudo cargar la imagen");
    }
    setTimeout(() => {
      toast.dismiss();
    }, 2000);
  } catch (error) {
    console.error("Error uploading images:", error);
    dispatch({
      type: UPLOAD_IMAGES_FAILURE,
      payload: "Error uploading images",
    });
  }
};


export const clearImages = () => ({
  type: CLEAR_IMAGES,
});

//PRODUCTOS
export const fetchSheets = () => async (dispatch) => {
  const token = localStorage.getItem("authToken");
  try {
    const res = await intance.get(`/api/sheets/data`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data.products);

    dispatch({
      type: FETCH_SHEETS,
      payload: res.data.products,
    });
  } catch (error) {
    console.log(error);
  }

};

export const getProductById = (id) => async (dispatch) => {
  try {
    const res = await intance.get(`/api/sheets/data/${id}`);
    dispatch({
      type: FETCH_PRODUCT_SHEET_BY_ID,
      payload: res.data
    })
  } catch (error) {
    console.log({ error: error.message });
  }
};

export const addSheetRow = (rowData) => async (dispatch) => {
  const token = localStorage.getItem("authToken");
  try {
    const res = await intance.post(`/api/sheets/data`, rowData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.loading("Creando producto");
    if (res.status === 200) {
      toast.success("Creado exitosamente");
      dispatch({
        type: ADD_SHEET_ROW,
        payload: res.data,
      });
      dispatch(fetchSheets());
    }
    setTimeout(() => {
      toast.dismiss();
    }, 2000);
  } catch (error) {
    console.log(error);
  }
};

export const updateRow = (rowData) => async (dispatch) => {
  try {
    const res = await intance.put(`/api/sheets/update`, rowData);
    if (res.status === 200) {
      toast.success("Editado exitosamente");
      dispatch({
        type: UPDATE_SHEET_ROW,
        payload: res.data,
      });
      dispatch(fetchSheets());
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteSheetRow = (rowIndex) => async (dispatch) => {
  const token = localStorage.getItem("authToken");
  try {
    const res = await intance.delete(`/api/sheets/delete/${rowIndex}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      toast.success("Eliminado exitosamente");
      dispatch({
        type: DELETE_SHEET_ROW,
        payload: rowIndex,
      });
      dispatch(fetchSheets());
    }
  } catch (error) {
    console.log(error);
  }
};

export const renderCondition = (condition) => ({
  type: SET_CONDITION,
  payload: condition,
});

export const filterByCategory = (category) => async (dispatch) => {
  const token = localStorage.getItem("authToken");
  try {

    const res = await intance.get(`/api/sheets/filter/${category}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    dispatch({
      type: FILTER_CATEGORY,
      payload: res.data.products,
    });
  } catch (error) {
    console.error("Error fetching sheets by category:", error);
  }
};

export const clearFilteredProducts = () => ({
  type: CLEAR_FILTER,
});

export const getCategories = () => async (dispatch) => {
  try {
    const response = await intance.get("/api/sheets/categories");
    const categories = response.data;

    dispatch({ type: GET_CATEGORIES, payload: categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

export const getColors = () => async (dispatch) => {
  try {
    const response = await intance.get("/api/sheets/colors");
    const colors = response.data;

    dispatch({ type: GET_COLORS, payload: colors });
  } catch (error) {
    console.error("Error fetching colors:", error);
  }
};

export const getProductsByColor = (color) => async (dispatch) => {
  try {
    const response = await intance.get(`/api/sheets/filter/color/${color}`);
    const products = response.data.products;


    dispatch({ type: FILTER_COLOR, payload: products });
  } catch (error) {
    console.error("Error fetching products by color:", error);
  }
};

export const publicProductById = (id) => async (dispatch) => {
  try {
    const res = await intance.put(`/api/sheets/product/${id}`);
    if (res.status === 200) {
      console.log(res);
      toast.success(res.data.message);
      dispatch({
        type: "PUBLIC_PRODUCT_BY_ID",
        payload: id,
      });
      dispatch(fetchSheets());
    }
  } catch (error) {
    console.log(error);
  }
};


export const deleteSaleRow = (rowIndex) => async (dispatch) => {
  const token = localStorage.getItem("authToken");
  try {
    const res = await intance.delete(`/api/sheets/delete/sale/${rowIndex}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    if (res.status === 200) {
      toast.success("Eliminado exitosamente");
      dispatch({
        type: DELETE_SALE_ROW,
        payload: rowIndex,
      });
      dispatch(getSales());
    }
  } catch (error) {
    console.log(error);
  }
};

//MAILS

export const sendEmail = async (userMail, paymentDetail) => {
  const emailContent = {
    to: userMail,
    subject: "Gracias por tu compra",
    message: renderEmail(paymentDetail), // Renderiza el HTML en el frontend
  };

  try {
    const response = await intance.post(`/api/mails/`, emailContent);
    return response;
  } catch (error) {
    console.error("Error al enviar el correo:", error.message);
    throw error; // Lanza el error para que pueda ser capturado en createSale
  }
};

export const sendEmailOrder = async (userMail, paymentDetail) => {
  const emailContent = {
    to: userMail,
    subject: "Tenes una nueva Venta!",
    message: renderEmailOrder(paymentDetail), // Renderiza el HTML en el frontend
  };

  try {
    const response = await intance.post(`/api/mails/`, emailContent);
    return response;
  } catch (error) {
    console.error("Error al enviar el correo:", error.message);
    throw error; // Lanza el error para que pueda ser capturado en createSale
  }
};

export const sendEmailChangeStateOrder = async (userMail, paymentDetail) => {
  const emailContent = {
    to: userMail,
    subject: "Actualizamos el estado de tu compra!",
    message: renderEmailOrderStateChange(paymentDetail), // Renderiza el HTML en el frontend
  };

  try {
    const response = await intance.post(`/api/mails/`, emailContent);
    return response;
  } catch (error) {
    console.error("Error al enviar el correo:", error.message);
    throw error; // Lanza el error para que pueda ser capturado en createSale
  }
};

// SECCIONES IMAGENES
// Acción para guardar los datos
export const createSection = (data) => async (dispatch) => {
  try {
    const response = await intance.post("/api/seccion", data);
    if (response.status === 200) {
      dispatch({
        type: CREATE_SECTION,
        payload: response.data, // los datos que has guardado
      });
      toast.success("Datos guardados exitosamente");
    }
  } catch (error) {
    console.error("Error al guardar los datos:", error);
    toast.error("Error al guardar los datos");
  }
};

// Acción para obtener los datos
export const getSection = () => async (dispatch) => {
  try {
    const response = await intance.get("/api/seccion");
    if (response.status === 200) {
      dispatch({
        type: GET_SECTION,
        payload: response.data, // los datos obtenidos del servidor
      });
    }
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    toast.error("Error al obtener los datos");
  }
};
