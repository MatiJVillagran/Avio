// sheetsReducer.js
import {
  FETCH_SHEETS,
  ADD_SHEET_ROW,
  UPDATE_SHEET_ROW,
  DELETE_SHEET_ROW,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  CLEAR_IMAGES,
  CLEAR_FILTER,
  CLEAR_MARCA,
  FILTER_CATEGORY,
  GET_CATEGORIES,
  SET_CONDITION,
  GET_CASH_FLOW,
  ADD_CASH_FLOW_ENTRY,
  FETCH_PRODUCT_SHEET_BY_ID,
  GET_MARCAS,
  FILTER_MARCAS,
  CREATE_SECTION,
  GET_SECTION,
  SET_VARIABLE,
  SEARCH_PRODUCT,
  CLEAN_SEARCH_PRODUCT,
  GET_DASHBOARD_CATEGORIES
} from "../actions/actions";

const initialState = {
  sheetsData: [],
  product: {},
  loading: false,
  error: null,
  rCondition: "allProducts",
  images: [],
  filterProducts: [],
  categories: [],
  dashboardCategories: [],
  cashFlow: [],
  marcas: [],
  filterMarcas: [],
  sectionData: [],
  searchedProducts: [],
  filterVar: null,
};

const sheetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SHEETS:
      return {
        ...state,
        sheetsData: action.payload,
        loading: false,
      };
    case FETCH_PRODUCT_SHEET_BY_ID:
      return {
        ...state,
        product: action.payload,
      }
    case ADD_SHEET_ROW:
      return {
        ...state,
        sheetsData: [...state.sheetsData, action.payload],
      };
    case UPDATE_SHEET_ROW:
      return {
        ...state,
        sheetsData: state.sheetsData.map((row) =>
          row[0] === action.payload[0] ? action.payload : row
        ),
      };
    case DELETE_SHEET_ROW:
      return {
        ...state,
        sheetsData: state.sheetsData.filter(
          (row) => row[0] !== action.payload // Utiliza el ID para filtrar
        ),
      };
    case UPLOAD_IMAGES_SUCCESS:
      return {
        ...state,
        images: [...state.images, action.payload],
        error: null,
      };
    case UPLOAD_IMAGES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_IMAGES: // Caso para limpiar imágenes
      return {
        ...state,
        images: [],
      };

    case CLEAR_MARCA:
      return {
        ...state,
        filterMarcas: [],
      }

    case SET_CONDITION:
      return { ...state, rCondition: action.payload };

    case FILTER_CATEGORY: // Productos filtrados por categoria  
      return {
        ...state,
        filterProducts: action.payload,
      }

    case CLEAR_FILTER:
      return {
        ...state,
        filterProducts: []
      }

    case GET_CATEGORIES: // Obtener todas las categorias
      return {
        ...state,
        categories: action.payload,
      };

    case GET_DASHBOARD_CATEGORIES:
      return {
        ...state,
        dashboardCategories: action.payload
      };

    case GET_MARCAS:
      return {
        ...state,
        marcas: action.payload,
      };

    case FILTER_MARCAS:
      return {
        ...state,
        filterMarcas: action.payload,
      };

    case GET_CASH_FLOW:
      return {
        ...state,
        cashFlow: action.payload,
      };

    case ADD_CASH_FLOW_ENTRY:
      return {
        ...state,
        cashFlow: [...state.cashFlow, action.payload],
      };

    case SET_VARIABLE:
      return { ...state, filterVar: action.payload };

    case SEARCH_PRODUCT:
      return {
        ...state,
        searchedProducts: action.payload
      };

    case CLEAN_SEARCH_PRODUCT:
      return {
        ...state,
        searchedProducts: []
      }

    // Acción para guardar los datos en sectionData
    case CREATE_SECTION:
      return {
        ...state,
        sectionData: [...state.sectionData, action.payload],
      };

    // Acción para obtener los datos y actualizar SectionData
    case GET_SECTION:
      return {
        ...state,
        sectionData: action.payload,
      };
    default:
      return state;
  }
};

export default sheetsReducer;
