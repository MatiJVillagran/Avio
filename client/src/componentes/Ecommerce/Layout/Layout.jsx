import React, { useState } from "react";
import FilterColor from "../Filters/FilterColor";
import { useSelector, useDispatch } from "react-redux";
import { clearFilteredProducts, clearMarca, renderCondition } from "../../../redux/actions/actions";
import FilterCategories from "../Filters/FilterCategories";
import SearchBar from "../Searchbar/SearchBar";



const Layout = ({ children, items }) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const filterVar = useSelector((state) => state.sheets.filterVar);
  const dispatch = useDispatch();

  const handleClearFilter = () => {
    dispatch(renderCondition("allProducts"));
    // dispatch(setVariable(null))
    dispatch(clearFilteredProducts());
    dispatch(clearMarca());
  };

  return (
    <section className="bg-gray-200">
      <div className="container px-3 py-6 mx-auto ">
        <div className="lg:flex lg:-mx-2 ">
          {/* Sidebar responsive toggle button */}
          <button
            className="lg:hidden bg-gray-800 text-white p-2 rounded flex flex-row gap-2 justify-center items-center"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>

            {isSidebarOpen ? "Cerrar Filtros" : "Abrir Filtros"}
          </button>

          {/* Sidebar */}
          <div
            className={`space-y-3 lg:w-1/6 lg:px-2 lg:space-y-4 ${isSidebarOpen ? "block" : "hidden lg:block"
              }`}
          >
            {/* Categorías */}
            <div className="mt-9">
              <SearchBar/>
              <div
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="flex flex-row justify-between cursor-pointer items-center gap-2"
              >
                <h1 className="text-black text-xl cursor-pointer">
                  Filtrar por categoría
                </h1>
                {isCategoriesOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 15.75 7.5-7.5 7.5 7.5"
                    />
                  </svg>
                )}
              </div>

              <div className="border border-gray-400 my-2 p-0 w-full shadow-md"></div>
              {isCategoriesOpen && (
                <div className="max-h-52 border border-gray-500 rounded-md overflow-y-auto overflow-x-hidden">
                  <FilterCategories />
                </div>
              )}
            </div>

            {/* Color */}
            <div className="mt-8">
              <div
                onClick={() => setIsColorOpen(!isColorOpen)}
                className="flex flex-row justify-between cursor-pointer items-center gap-2"
              >
                <h1 className="text-black text-xl cursor-pointer">
                  Filtrar por marca
                </h1>
                {isColorOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 15.75 7.5-7.5 7.5 7.5"
                    />
                  </svg>
                )}
              </div>
              <div className="border border-gray-400 my-2 p-0 w-full shadow-md"></div>
              {isColorOpen && (
                <div className="max-h-60 border border-gray-500 rounded-md overflow-y-auto overflow-x-hidden">
                  <FilterColor />
                </div>
              )}
            </div>

          </div>

          {/* Products Section */}
          <div className="mt-6 lg:mt-0 lg:px-2 lg:w-4/5">
            <div className="text-sm tracking-widest uppercase">
              <p className="text-black">   Items {items}</p>

              {/* Filter Variable */}
   
            </div>

            <div className="mt-4 lg:border-l border-t lg:rounded-md border-gray-800">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Layout;
