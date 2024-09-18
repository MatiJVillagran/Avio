import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import ImageComponent from "../Images/ImageComponent";
import { LazyLoadImage } from "react-lazy-load-image-component";

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "blue",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "blue",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
};

const ProductCard = ({ id, name, url, sku, price, quantity,  onAddToCart, isNew, marca }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    customPaging: (i) => (
      <div
        style={{
          width: "10px",
          height: "10px",
          background: "orange",
          borderRadius: "50%",
          display: "inline-block",
          margin: "0 5px",
        }}
      ></div>
    ),
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <ul style={{ margin: 0, padding: 0, display: "flex" }}>{dots}</ul>
      </div>
    ),
  };
  
  return (
    <article className="w-59 h-full rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 mb-6 border border-gray-300">
      <div>
        <div className="relative flex items-end overflow-hidden rounded-xl">
          <Link to={`/product/${id}`}>
            {url.includes(",") ? (
              <ImageComponent imageUrls={url}  isAvailable={quantity > 0}/>
            ) : (
              <LazyLoadImage
                src={url}
                alt={name}
                className={`w-64 h-64 object-cover ${quantity === 0 ? "grayscale opacity-50" : ""}`}
              />
            )}
          </Link>
          <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-2 text-sm text-slate-400">4.9</span>
          </div>

          <button
            className="absolute bottom-3 left-2 inline-flex items-center rounded-lg bg-white p-2 shadow-lg hover:shadow-lg transition-transform duration-300 transform hover:scale-110"
          // onClick={onAddToFav}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`h-5 w-5`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            <span className="ml-1 text-sm text-slate-400">{ }</span>
          </button>
        </div>
      </div>
      {isNew && (
        <div className="absolute top-5 right-5">
          <div className="relative">
            <div className="transform flex justify-center items-center rotate-45 rounded-t-3xl rounded-b-sm translate-x-1/2 -translate-y-1/2 w-20 bg-red-500 text-white text-center text-xs font-bold px-6 py-1 shadow-lg">
              Nuevo
            </div>
          </div>
        </div>
      )}
      <div className="mt-1 p-2">
        <h2 className="text-slate-700">{name}</h2>
        
        <p className="mt-1 text-sm text-slate-400">{marca}</p>

        <div className="mt-3 flex items-end justify-between">
          <p className="text-lg font-bold text-secondary">${price}</p>

          <div
            onClick={() => onAddToCart()}
            className="flex items-center space-x-1.5 rounded-lg border border-gray-300 p-2"
          >
 
            <svg viewBox="0 -2.69 20.438 20.438" xmlns="http://www.w3.org/2000/svg" fill="#000000" className="h-4 w-4"><g id="SVGRepo_bgCarrier" stroke="currentColor" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="Path_9" data-name="Path 9" d="M312.693,827.969h-.7v5.045a3.01,3.01,0,0,1-3.009,3.01h-9.991a3.01,3.01,0,0,1-3.009-3.01v-5.045h-.73a1.5,1.5,0,0,1,0-3h5.078l2.812-3.006-.165-.151.895-.841.106.1.092-.1.9.841-.084.089,3.331,3.068h4.478a1.5,1.5,0,0,1,0,3Zm-15.724,5.2a1.805,1.805,0,0,0,1.806,1.806h10.4a1.805,1.805,0,0,0,1.806-1.806V828H296.969Zm7.077-10.383-2.059,2.182h4.444Zm7.622,3.2h-15.4c-.733,0-1.328.229-1.328.512s.6.511,1.328.511h15.4c.734,0,1.328-.229,1.328-.511S312.4,825.986,311.668,825.986Zm-10.7,4.983h6V832h-6Z" transform="translate(-293.755 -820.971)" fill="#444"></path> </g></svg>
            <button
              className={`text-sm text-slate-700 ${quantity === 0 ? "cursor-not-allowed text-red-400" : ""
                }`}
            >
              {quantity === 0 ? "Sin stock" : "Agregar"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
