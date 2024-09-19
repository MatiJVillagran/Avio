import { useDispatch } from 'react-redux';
import React from 'react'
import { useSelector } from 'react-redux'
import {getProductsByMarca, renderCondition } from '../../../redux/actions/actions';

const FilterColor = () => {

    const allMarcas = useSelector((state) => state.sheets.marcas);
    const dispatch = useDispatch();

    const handleMarcaFilter = (event) => {
        const marca = event.target.value;
    
    if (marca!=="Todos"){
      dispatch (getProductsByMarca(marca));
      dispatch(renderCondition("filteredColor"));
    }else{
      dispatch(renderCondition("allProducts"));

    }}


    return (
      <div className="flex items-center mt-5 px-1">
        <div className="p-4 rounded-md">
          <div className="grid grid-cols-2 flex-col gap-2">
            <button
              value={"Todos"}
              onClick={handleMarcaFilter}
              className="px-3 py-2 bg-primary rounded-md text-white text-xs"
            >
              Todos
            </button>
            {allMarcas.map((marca, index) => (
              <button
                key={index}
                value={marca}
                onClick={handleMarcaFilter}
                className="px-3 flex justify-center items-center py-3 bg-primary w-max rounded-md text-white text-xs whitespace-nowrap" // Ajusta padding y font-size
              >
                {marca}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default FilterColor;
  