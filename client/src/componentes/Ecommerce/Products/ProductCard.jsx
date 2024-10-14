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

const ProductCard = ({ id, name, url, sku, price, quantity, onAddToCart, isNew, marca, medida }) => {
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
    <article className="w-auto h-full rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 mb-6 border border-gray-300 flex flex-col justify-between">
      <div>
        <div className="relative flex items-end overflow-hidden rounded-xl">
          <Link to={`/product/${id}`}>
            {url.includes(",") ? (
              <ImageComponent imageUrls={url} isAvailable={quantity > 0} />
            ) : (
              <LazyLoadImage
                src={url}
                alt={name}
                className={`w-64 h-64 object-cover ${quantity === 0 ? "grayscale opacity-50" : ""}`}
              />
            )}
          </Link>
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
          <div className="min-h-[6rem]"> {/* Añadiendo una altura mínima aquí */}
            <h2 className="text-slate-700">{name}</h2>
            <p className="mt-1 text-sm text-slate-400">{marca}</p>
            <p className="mt-1 text-sm text-slate-400">{medida}</p>
            
          </div>
          <div className="mt-2">
            <p className="text-lg font-bold text-gray-500">${price}</p>
          </div>
        </div>
      </div>
      <button
        onClick={() => onAddToCart()}
        className="flex items-center justify-center space-x-1.5 rounded-lg border border-gray-300 hover:bg-tertiary group transition duration-150 ease-in-out cursor-pointer focus:outline-none focus:text-white p-2 mt-0"
      >
        <svg viewBox="0 -2.69 20.438 20.438" xmlns="http://www.w3.org/2000/svg" fill="#000000" className="h-5 w-5 group-hover:fill-white">
          <g id="SVGRepo_bgCarrier" stroke="currentColor" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path id="Path_9" data-name="Path 9" d="M312.693,827.969h-.7v5.045a3.01,3.01,0,0,1-3.009,3.01h-9.991a3.01,3.01,0,0,1-3.009-3.01v-5.045h-.73a1.5,1.5,0,0,1,0-3h5.078l2.812-3.006-.165-.151.895-.841.106.1.092-.1.9.841-.084.089,3.331,3.068h4.478a1.5,1.5,0,0,1,0,3Zm-15.724,5.2a1.805,1.805,0,0,0,1.806,1.806h10.4a1.805,1.805,0,0,0,1.806-1.806V828H296.969Zm7.077-10.383-2.059,2.182h4.444Zm7.622,3.2h-15.4c-.733,0-1.328.229-1.328.512s.6.511,1.328.511h15.4c.734,0,1.328-.229,1.328-.511S312.4,825.986,311.668,825.986Zm-10.7,4.983h6V832h-6Z" transform="translate(-293.755 -820.971)" fill="#444"></path>
          </g>
        </svg>
        <span
          className={`text-base text-slate-700 group-hover:text-white ${quantity === 0 ? "cursor-not-allowed text-red-400" : ""}`}
        >
          {quantity === 0 ? "Sin stock" : "Agregar"}
        </span>
      </button>
    </article>




  );
};

export default ProductCard;