import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import ProductCard from "./ProductCard";
import Layout from "../Layout/Layout";
import { addToCart } from "../../../redux/actions/actions";
import InfiniteScroll from "../Paginate/InfiniteScroll";
import ScrollToTopButton from "../Scroll/ScrollToTopButton";
import Loader from "../Loader/Loader";



export default function ProductList({ allProducts }) {
  const [visibleProducts, setVisibleProducts] = useState(8); // Mostrar 8 productos inicialmente
  const dispatch = useDispatch();
  const cartError = useSelector((state) => state.cart.cartError);
  const searchterm = useSelector((state) => state.sheets.searchedProducts);

  

  const publishedProducts = allProducts?.filter(
    (product) => product.publicado === "si"
  );
  
  // Productos a mostrar basado en el número de productos visibles
  const currentProducts = publishedProducts.slice(0, visibleProducts);

  const handleAddToCart = (product) => {

    if (product.stock === 0)
      {toast.error(`${product.nombre} no tiene stock por el momento`);
        return;}
    dispatch(addToCart(product));
    toast.success(`${product.nombre} añadido a la canasta`);
  };

  useEffect(() => {
    if (cartError) {
      toast.error(cartError);
    }
  }, [cartError]);

  useEffect(() => {
    setVisibleProducts(8); // Reiniciar a 8 productos visibles cuando cambien los productos
  }, [allProducts]);

  // Función para procesar los colores
  const processColors = (colorString) => {
    return colorString
      .split(",") // Divide la cadena por comas
      .map((color) => color.trim().toLowerCase()) // Elimina espacios y convierte a minúsculas
      .filter((color) => color); // Elimina entradas vacías
  };

  const handleLoadMore = () => {
    setVisibleProducts((prevVisible) => prevVisible + 8); // Incrementa los productos visibles en 8 cada vez que se presiona el botón
  };

  return (
    <Layout items={currentProducts.length}>
      <div className="h-full mt-4 mb-16 flex justify-center items-center flex-col p-2 rounded-md ">
      
        {currentProducts.length === 0 ? (
          <div className="text-center text-gray-600 font-bold text-2xl mt-16">
            <Loader/>
          </div>
        ) : (
          <div className="max-w-screen grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 ">
            {currentProducts.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.nombre}
                  url={product.url}
                  sku={product.sku}
                  price={product.precio}
                  quantity={product.stock}
                  medida={product.medida}
                  marca={(product.marca)}
                  onAddToCart={() => handleAddToCart (product)} // Pasar directamente handleAddToCart
                  isNew={false}
                />
              );
            })}
          </div>
        )}
        <InfiniteScroll
          visibleProducts={visibleProducts}
          totalProducts={allProducts.length}
          onLoadMore={handleLoadMore} // Pasar la función para cargar más productos
        />
        <ScrollToTopButton />
      </div>
    </Layout>
  );
}
