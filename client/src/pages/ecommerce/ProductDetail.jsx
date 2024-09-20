import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Navigation from "../../componentes/Ecommerce/Nav/Navigation";
import Loader from "../../componentes/Ecommerce/Loader/Loader";
import { addToCart, getProductById } from "../../redux/actions/actions";
import "./ProductDetail.css";

const ProductDetail = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.sheets.product);
  const cartItems = useSelector((state) => state.cart.cartItems); 
  const imgUrl = product?.url?.split(", ");

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getProductById(id));
      setIsLoading(false);
    };

    fetchData();
  }, [dispatch, id]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imgUrl.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === imgUrl.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleAddToCart = (product) => {
    const available = parseInt(product.cantidad); 
    const selectedQty = parseInt(selectedQuantity); 

    const cartItem = cartItems.find((item) => item.id === product.id);
    const totalInCart = cartItem ? cartItem.cantidad : 0;

    if (selectedQty + totalInCart > available) {
      toast.error(`${available} unidades disponibles.`);
    } else if (selectedQty <= 0) {
      toast.error("La cantidad debe ser mayor que 0.");
    } else {
      toast.success("Producto agregado a la canasta");
      dispatch(
        addToCart({
          ...product,
          cantidad: selectedQty,
        })
      );
    }
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (value > 0) {
      setSelectedQuantity(value); 
    } else {
      setSelectedQuantity(1); 
    }
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="w-full">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <>
          <Navigation isCart={false} />

          <div className="w-full">
            <div className="detail-cont flex flex-col justify-center items-center lg:flex-row p-4 my-2">
              <div className="p-2 flex justify-center items-center flex-col-reverse rounded-lg">
                <div className="flex gap-2 border mt-2 border-gray-400 rounded-lg shadow-md w-full p-2 overflow-x-auto">
                  {imgUrl?.length > 1 ? (
                    <div className="flex space-x-2">
                      {imgUrl?.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className={`thumbnail rounded-md object-cover border border-gray-500 p-1 w-24 h-24 ${
                            product.cantidad === "0" ? "grayscale opacity-50" : ""
                          } ${currentImageIndex === index ? "selected" : ""}`}
                          onClick={() => handleThumbnailClick(index)}
                        />
                      ))}
                    </div>
                  ) : (
                    <img
                      className={`w-16 h-16 rounded-md object-cover border border-gray-500 p-1 ${
                        product?.cantidad === "0" ? "grayscale opacity-50" : ""
                      }`}
                      src={imgUrl ? imgUrl : "avio.jpeg"}
                      alt={`Product Image ${currentImageIndex + 1}`}
                    />
                  )}
                </div>
                <div className={`image-container border border-gray-400 rounded-lg p-2 shadow-md ${product?.cantidad === "0" ? "grayscale opacity-50" : ""}`}>
                  {imgUrl?.length > 1 && (
                    <button onClick={handlePrevImage}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 19.5 8.25 12l7.5-7.5"
                        />
                      </svg>
                    </button>
                  )}
                  <img
                    src={imgUrl ? imgUrl[currentImageIndex] : "avio.jpeg"}
                    alt={`Product Image ${currentImageIndex + 1}`}
                  />
                  {imgUrl?.length > 1 && (
                    <button onClick={handleNextImage}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              <div className="info-container md:h-screen border border-gray-400 w-full">
                <div>
                  <p className="product-date">
                    Marca: {product ? product.marca : null}
                  </p>
                  <h1 className="product-name">{product?.nombre}</h1>
                  <p className="brand">Categoria: {product?.categoria}</p>
                  <p className="product-price">${product?.precio}</p>
                </div>
                <div className="product-quantity flex justify-center items-center flex-col gap-2">
                  <div className="flex flex-row">
                    <label htmlFor="quantity-select">Cantidad: </label>
                    <span className="total-available">
                      ({product?.cantidad} {"Disponible"})
                    </span>
                  </div>
                  <input
                    value={selectedQuantity}
                    onChange={handleQuantityChange}
                    className="border p-2 w-16 border-gray-500 rounded-md text-center"
                    type="number"
                    name="quantity-select"
                    id="quantity-select"
                    min="1"
                    max={product?.cantidad}
                  />
                </div>
                <div className="flex w-full">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`p-3 rounded-md text-white w-full shadow-md ${
                      product?.cantidad === "0"
                        ? "cursor-not-allowed bg-gray-400"
                        : "bg-tertiary"
                    }`}
                  >
                    {product.cantidad===0 ? "Sin stock" : "Agregar a la canasta"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
