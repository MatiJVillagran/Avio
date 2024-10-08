import toast from "react-hot-toast";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";

export default function CartList({ cartItems, calculateTotal }) {
  const navigate = useNavigate();

  const handleContinuePurchase = () => {
    if (cartItems.length === 0) {
      toast.error("Error: canasta vacía");
    } else {
      navigate("/cart");
    }
  };

  return (
    <div
      className={`absolute ${
        cartItems.length === 0 ? "w-96" : "w-96"
      } top-12 -right-16 lg:top-10 h-max lg:h-screen lg:-right-24 bg-white rounded-b-lg p-4 border-r border-gray-200 shadow-2xl `}
    >
      <div
        className={`text-center transition duration-50 ease ${
          cartItems.length > 4 ? "h-60 overflow-y-scroll" : "overflow-hidden"
        }`}
      >
        {cartItems.length > 0
          ? cartItems.map((product, index) => (
              <CartItem key={index} product={product} />
            ))
          : "Canasta vacia"}
      </div>
      {/* Total del carrito */}
      <div className="mt-4">
        {cartItems.length > 0 ? (
          <>
            <h3 className="text-lg font-semibold">Total:</h3>
            <p className="text-gray-500">${calculateTotal()}</p>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="mt-4">
        <button
          onClick={handleContinuePurchase}
          className={`border p-2 hover:text-secondary hover:border-secondary hover:shadow-lg active:translate-y-[5%] rounded-md active:shadow-xl ${
            cartItems.length === 0 ? "hidden" : ""
          }`}
        >
          Continuar compra
        </button>
      </div>
    </div>
  );
}
