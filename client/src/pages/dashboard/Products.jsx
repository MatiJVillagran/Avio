import React, { useEffect, useState } from "react";
import { Layout } from "../../componentes/Dashboard/Layout/Layout";
import SheetsData from "../../componentes/Dashboard/Sheets/SheetsData";
import TabFormCreateProduct from "../../componentes/Dashboard/Popup/TabFormCreateProduct";
import { useDispatch, useSelector } from "react-redux";
import { fetchSheets } from "../../redux/actions/actions";
import TabDeleteRowButton from "../../componentes/Dashboard/Popup/TabDeleteRowButton";
import TabConfirmPublicProduct from "../../componentes/Dashboard/Popup/TabConfirmPublicProduct";
import TabDescriptionModal from "../../componentes/Dashboard/Popup/TabDescriptionModal";

const Products = () => {
  const [activeForm, setActiveForm] = useState(false);
  const [activePublicProd, setActivePublicProd] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteRowIndex, setDeleteRowIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [visiblePages, setVisiblePages] = useState([1, 2, 3, 4]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [currentDescription, setCurrentDescription] = useState('');

  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.sheets.sheetsData);

  useEffect(() => {
    dispatch(fetchSheets());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const toggleModal = (product) => {
    setSelectedProduct(product);
    setActiveForm(!activeForm);
  };

  const toggleDeleteModal = (index) => {
    setDeleteRowIndex(index);
  };

  const toggleActiveModal = (id) => {
    setActivePublicProd(id);
  };

  const toggleDescriptionModal = (description) => {
    setCurrentDescription(description);
    setShowDescriptionModal(!showDescriptionModal);
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = data.filter(
      (item) =>
        item.nombre.toLowerCase().includes(value) ||
        item.categoria.toLowerCase().includes(value) ||
        item.sku.toLowerCase().includes(value)
    );

    setFilteredData(filtered);
    setCurrentPage(1);
    updateVisiblePages(1);
  };

  // Lógica de paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    updateVisiblePages(pageNumber);
  };

  const updateVisiblePages = (pageNumber) => {
    let startPage, endPage;
    if (totalPages <= 4) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (pageNumber <= 2) {
        startPage = 1;
        endPage = 4;
      } else if (pageNumber >= totalPages - 1) {
        startPage = totalPages - 3;
        endPage = totalPages;
      } else {
        startPage = pageNumber - 1;
        endPage = pageNumber + 2;
      }
    }
    setVisiblePages(
      [...Array(endPage - startPage + 1).keys()].map((i) => startPage + i)
    );
  };

  useEffect(() => {
    updateVisiblePages(currentPage);
  }, [totalPages]);

  return (
    <Layout isAuth={isAuth}>
      {activeForm && (
        <TabFormCreateProduct
          isOpen={activeForm}
          onClose={toggleModal}
          product={selectedProduct}
        />
      )}
      {deleteRowIndex !== null && (
        <TabDeleteRowButton
          rowIndex={deleteRowIndex}
          onClose={() => toggleDeleteModal(null)}
        />
      )}
      {activePublicProd !== null && (
        <TabConfirmPublicProduct
          id={activePublicProd}
          onClose={() => toggleActiveModal(null)}
        />
      )}
      {showDescriptionModal && (
        <TabDescriptionModal
          description={currentDescription}
          onClose={() => setShowDescriptionModal(false)}
        />
      )}
      <div className="flex justify-between">
        <h1 className="text-xl text-gray-500">Productos</h1>
        <button
          onClick={() => toggleModal()}
          className="p-2 border border-secondary bg-secondary text-white rounded-md hover:bg-primary hover:text-white active:translate-y-[2px] shadow-sm hover:shadow-md"
        >
          Crear nuevo producto
        </button>
      </div>
      <div className="mt-3">
        <input
          type="text"
          placeholder="Buscar por nombre, categoría o SKU"
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-400 rounded-md w-full"
        />
      </div>
      <div className="mt-6 h-screen">
        <SheetsData
          data={currentItems}
          toggleModal={toggleModal}
          toggleDeleteModal={toggleDeleteModal}
          toggleActiveModal={toggleActiveModal}
          toggleDescriptionModal={toggleDescriptionModal}
        />
        <div className="flex justify-center mt-3 ">
  {/* Botón para ir a la primera página */}
  <button
    onClick={() => handlePageChange(1)}
    disabled={currentPage === 1}
    className="px-3 py-2 mx-1 bg-secondary text-white border border-gray-400 rounded-md disabled:opacity-50"
  >
    Primera
  </button>

  {/* Botón para ir a la página anterior */}
  <button
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 1}
    className="px-3 py-1 mx-1 bg-pink-400 text-white border border-gray-400 rounded-md disabled:opacity-50"
  >
    {"<<"}
  </button>

  {/* Renderiza los números de las páginas visibles */}
  {visiblePages.map((number) => (
    <button
      key={number}
      onClick={() => handlePageChange(number)}
      className={`px-3 py-2 mx-1 border border-gray-400 rounded-md ${
        currentPage === number ? "bg-primary text-white" : "bg-white"
      }`}
    >
      {number}
    </button>
  ))}

  {/* Botón para ir a la página siguiente */}
  <button
    onClick={() => handlePageChange(currentPage + 1)}
    disabled={currentPage === totalPages}
    className="px-3 py-1 mx-1 bg-pink-400 text-white border border-gray-400 rounded-md disabled:opacity-50"
  >
    {">>"}
  </button>

  {/* Botón para ir a la última página */}
  <button
    onClick={() => handlePageChange(totalPages)}
    disabled={currentPage === totalPages}
    className="px-3 py-2 mx-1 bg-secondary text-white border border-gray-400 rounded-md disabled:opacity-50"
  >
    Última
  </button>
</div>
      </div>
    </Layout>
  );
};

export default Products;
