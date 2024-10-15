import React, { useEffect, useState } from "react";
import { Layout } from "../../componentes/Dashboard/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getSaleByUserName, getSaleInfo, getSales, cleanSales } from "../../redux/actions/actions"; // Importa cleanSales
import SheetsSales from "../../componentes/Dashboard/Sheets/SheetsSales";
import TabViewSale from "../../componentes/Dashboard/Popup/TabViewSale";
import TabDeleteSaleButton from "../../componentes/Dashboard/Popup/TabDeleteSaleButton";

const Sales = () => {
  const [openModal, setOpenModal] = useState(false);
  const [deleteRowIndex, setDeleteRowIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [visiblePages, setVisiblePages] = useState([1, 2, 3]);

  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  
  const nameSearch = useSelector((state) => state.cart.nameSales);
  const allSales = useSelector((state) => state.cart.sales);
  const sale = useSelector((state) => state.cart.saleInfo);

  
  
  const [nombre, setNombre] = useState("");
  const [search, setSearch] = useState(null);

  const sales = search ? nameSearch : allSales;

  

  const toggleModal = (saleInfo) => {
    dispatch(getSaleInfo(saleInfo.id));
    setOpenModal(!openModal);
  };

  const toggleDeleteModal = (i) => {
    setDeleteRowIndex(i);
  };

  useEffect(() => {
    dispatch(getSales());
  }, [dispatch]);

  useEffect(() => {
    updateVisiblePages(currentPage);
  }, [currentPage, sales]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    updateVisiblePages(pageNumber);
  };

  const handleSearch = () => {
    if (nombre.trim()) {
      dispatch(getSaleByUserName(nombre));
      setSearch(true); 
    } else {
      setSearch(null);
    }
  };

  const clearSearch = () => {
    setNombre(""); // Limpia el input
    setSearch(null); // Reinicia el estado de búsqueda
    dispatch(cleanSales())}

  const updateVisiblePages = (pageNumber) => {
    let startPage, endPage;
    if (totalPages <= 3) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (pageNumber === 1) {
        startPage = 1;
        endPage = 3;
      } else if (pageNumber === totalPages) {
        startPage = totalPages - 2;
        endPage = totalPages;
      } else {
        startPage = pageNumber - 1;
        endPage = pageNumber + 1;
      }
    }
    setVisiblePages([...Array(endPage - startPage + 1).keys()].map(i => startPage + i));
  };

  const totalPages = Math.ceil(sales.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sales.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Layout isAuth={isAuth}>
      {openModal && (
        <TabViewSale
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          sale={sale}
          infoVentas={sales}
        />
      )}
      {deleteRowIndex !== null && (
        <TabDeleteSaleButton 
          rowIndex={deleteRowIndex}
          onClose={() => toggleDeleteModal(null)}
        />
      )}
      <div className="flex justify-between">
        <h1 className="text-xl text-gray-500">Ventas</h1>
      </div>
      <div className="mt-4 relative">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="p-2 border border-gray-400 rounded-md w-full"
        />
        {nombre && (
          <button
            onClick={clearSearch} // Llama a la función clearSearch cuando se hace clic
            className="absolute right-2 top-2 text-gray-500"
          >
            ✕ {/* Este es el ícono de la cruz */}
          </button>
        )}
        <button
          onClick={handleSearch}
          className="mt-2 px-4 py-2 bg-pink-400 text-white rounded-md"
        >
          Buscar
        </button>
      </div>
      <div className="mt-8 h-screen">
        <SheetsSales data={currentItems} onViewSale={toggleModal} toggleDelete={toggleDeleteModal}/>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 bg-pink-400 text-white border border-gray-400 rounded-md disabled:opacity-50"
          >
            Anterior
          </button>
          {visiblePages.map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`px-4 py-2 mx-1 border border-gray-400 rounded-md ${currentPage === number ? 'bg-primary text-white' : 'bg-white'}`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-1 bg-pink-400 text-white border border-gray-400 rounded-md disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Sales;
