import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import toast from "react-hot-toast";
import { useSelector } from 'react-redux';
import { getSection } from '../../redux/actions/actions';
import { Layout } from '../../componentes/Dashboard/Layout/Layout';
import { TabViewImages } from '../../componentes/Dashboard/ImageCarrousel/TabViewImages';

export function ImageGallery() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();

  // Llamada a la API para obtener los datos
  useEffect(()=>{
    dispatch(getSection());
  }),[dispatch];


  

  return (
    <Layout isAuth={isAuth}>
    <div className="flex justify-between">
        <h1 className="text-xl text-gray-500">Edicion Carrusel</h1>
      </div>
      <div className="mt-6 h-screen">
        <TabViewImages/>

    </div>
    </Layout>
  );
}
