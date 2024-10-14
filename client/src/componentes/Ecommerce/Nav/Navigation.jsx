import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartList from "../Cart/CartList";
import UserLogged from "../User/UserLogged";

const Navigation = () => {
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);


  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();


  const handleDashboard = () => {
    navigate("/dashboard/dashboard");
  };

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const handleShowLogin = () => {
    if (!isEmpty(user)) {
      setShowLogin(!showLogin);
    } else {
      navigate("/login");
    }
  };

  const handleOnClose = () => {
    setShowLogin(false);
  };

  const calculateTotal = () => {
    const total = cartItems.reduce((acc, product) => {
      const price = parseFloat(product.precio);
      const quantity = product.cantidad || 1;
      return acc + (isNaN(price) ? 0 : price * quantity);
    }, 0);

    return total.toFixed(2);
  };

  return (
    <nav className="relative">
      <div className="relative z-30 bg-gray-100 shadow-lg">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex justify-center items-center px-2 lg:px-0">
              <Link to="/" className="flex-shrink-0">
                <img
                  className="h-12 w-12 object-cover rounded-full"
                  src="https://i.ibb.co/THt2PXT/images-1.jpg"
                  alt="Logo"
                />
              </Link>
              <div className="hidden lg:block lg:ml-2">
                <div className="flex">
                  <Link
                    to="/product"
                    className="ml-4 px-3 py-2 rounded-md text-base leading-5 text-gray-800 hover:bg-tertiary hover:text-white transition duration-150 ease-in-out cursor-pointer focus:outline-none focus:text-white focus:bg-gray-700 "
                  >
                    Productos
                  </Link>
                  <Link
                    to="#"
                    className="ml-4 px-3 py-2 rounded-md text-base leading-5 text-gray-800 hover:bg-tertiary hover:text-white transition duration-150 ease-in-out cursor-pointer focus:outline-none focus:text-white focus:bg-gray-700 "
                  >
                    Proveedores amigos
                  </Link>
                  <Link
                    to="/aboutUs"
                    className="ml-4 px-3 py-2 rounded-md text-base leading-5 text-gray-800 hover:bg-tertiary hover:text-white transition duration-150 ease-in-out cursor-pointer focus:outline-none focus:text-white focus:bg-gray-700 "
                  >
                    Sobre nosotros
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-center gap-2 px-2 lg:ml-6 lg:justify-end">
              <div className="max-w-lg w-full lg:max-w-xs">
              </div>
              {user.rol === 'admin' && (
                <div className="tooltip">
                  <button
                    onClick={handleDashboard}
                    className={`border hover:shadow-lg hover:border-secondary hover:text-secondary rounded-lg w-auto p-2 flex items-center`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink ="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" width="28px" height="28px" viewBox="0 -4 28 28" version="1.1">

                      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" sketch:type="MSPage">
                        <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-570.000000, -209.000000)" fill="#000000">
                          <path d="M597,226 L579,226 C578.447,226 578,226.448 578,227 C578,227.553 578.447,228 579,228 L597,228 C597.553,228 598,227.553 598,227 C598,226.448 597.553,226 597,226 L597,226 Z M572,209 C570.896,209 570,209.896 570,211 C570,212.104 570.896,213 572,213 C573.104,213 574,212.104 574,211 C574,209.896 573.104,209 572,209 L572,209 Z M579,212 L597,212 C597.553,212 598,211.553 598,211 C598,210.447 597.553,210 597,210 L579,210 C578.447,210 578,210.447 578,211 C578,211.553 578.447,212 579,212 L579,212 Z M597,218 L579,218 C578.447,218 578,218.448 578,219 C578,219.553 578.447,220 579,220 L597,220 C597.553,220 598,219.553 598,219 C598,218.448 597.553,218 597,218 L597,218 Z M572,217 C570.896,217 570,217.896 570,219 C570,220.104 570.896,221 572,221 C573.104,221 574,220.104 574,219 C574,217.896 573.104,217 572,217 L572,217 Z M572,225 C570.896,225 570,225.896 570,227 C570,228.104 570.896,229 572,229 C573.104,229 574,228.104 574,227 C574,225.896 573.104,225 572,225 L572,225 Z" id="bullet-list" sketch:type="MSShapeGroup">
                          </path>
                        </g>
                      </g>
                    </svg>
                  </button>
                </div>
              )}
              <div className="tooltip">
                <button
                  onClick={toggleCart}
                  className={`border hover:shadow-lg hover:border-secondary hover:text-secondary rounded-lg w-auto p-2 flex items-center`}
                >
                  <svg viewBox="0 -2.69 20.438 20.438" xmlns="http://www.w3.org/2000/svg" fill="#000000" className="size-7"><g id="SVGRepo_bgCarrier" stroke="currentColor" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="Path_9" data-name="Path 9" d="M312.693,827.969h-.7v5.045a3.01,3.01,0,0,1-3.009,3.01h-9.991a3.01,3.01,0,0,1-3.009-3.01v-5.045h-.73a1.5,1.5,0,0,1,0-3h5.078l2.812-3.006-.165-.151.895-.841.106.1.092-.1.9.841-.084.089,3.331,3.068h4.478a1.5,1.5,0,0,1,0,3Zm-15.724,5.2a1.805,1.805,0,0,0,1.806,1.806h10.4a1.805,1.805,0,0,0,1.806-1.806V828H296.969Zm7.077-10.383-2.059,2.182h4.444Zm7.622,3.2h-15.4c-.733,0-1.328.229-1.328.512s.6.511,1.328.511h15.4c.734,0,1.328-.229,1.328-.511S312.4,825.986,311.668,825.986Zm-10.7,4.983h6V832h-6Z" transform="translate(-293.755 -820.971)" fill="#444"></path> </g></svg>

                  {cartItems?.length > 0 && (
                    <span className="bg-secondary text-white text-xs rounded-full w-4 h-4 text-center top-0 left-0">
                      {cartItems?.length}
                    </span>
                  )}
                </button>
              </div>
              <div className="relative mt-4">
                {showCart && (
                  <CartList
                    cartItems={cartItems}
                    calculateTotal={calculateTotal}
                  />
                )}
              </div>
              <div className="tooltip">
                <button
                  onClick={handleShowLogin}
                  className={`border hover:shadow-lg hover:border-secondary hover:text-secondary rounded-lg w-auto p-2 flex items-center`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none" className="size-7">
                    <circle cx="12" cy="10" r="3" stroke="#222222" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="9" stroke="#222222" />
                    <path d="M18 18.7059C17.6461 17.6427 16.8662 16.7033 15.7814 16.0332C14.6966 15.3632 13.3674 15 12 15C10.6326 15 9.30341 15.3632 8.21858 16.0332C7.13375 16.7033 6.35391 17.6427 6 18.7059" stroke="#222222" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <div className="relative mt-4">
                {showLogin && (
                  <UserLogged onClose={handleOnClose} user={user} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3">
            <Link
              to="/product"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-secondary hover:text-white focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out cursor-pointer"
            >
              Productos
            </Link>
            <Link
              to="#"
              className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-secondary hover:text-white focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out cursor-pointer"
            >
              Proveedores amigos
            </Link>
            <Link
              to="/aboutUs"
              className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:bg-secondary hover:text-white focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out cursor-pointer"
            >
              Sobre Nosotros
            </Link>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
