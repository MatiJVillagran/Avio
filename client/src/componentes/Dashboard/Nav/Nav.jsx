import { Link } from "react-router-dom";
import { doSignOut } from "../../../firebase/auth";

export const Nav = ({ user, showNav }) => {
  return (
    <div
      className={`space-y-6 md:space-y-10 w-full mt-10 ${
        showNav ? "left-0 " : "-left-full "
      }md:left-0 transition-all duration-300 ease-in-out md:relative fixed top-0 left-0 h-full md:h-auto bg-primary z-30`}
    >
      <h1 className="font-bold text-4xl text-center md:hidden">
        N<span className="text-primary">.</span>
      </h1>
      <Link to="/">
      <h1 className="hidden md:block font-bold text-sm md:text-xl text-center">
        Avio Inicio<span className="text-primary">.</span>
      </h1>
      </Link>
      <div id="profile" className="space-y-3">
        {user.picture ? (
          <img
            src={user.picture}
            alt="Avatar user"
            className="w-10 md:w-16 rounded-full mx-auto"
          />
        ) : (
          ""
        )}
        <div>
          <h2 className="font-medium text-xs md:text-sm text-center text-primary">
            {user.name}
          </h2>
          <p className="text-xs text-black text-center">Administrador</p>
        </div>
      </div>
      <div id="menu" className="flex flex-col w-full space-y-2">
        <Link
          to={"/dashboard/dashboard"}
          className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-primary hover:text-white rounded-md transition duration-150 ease-in-out"
        >
          <svg
            className="w-6 h-6 fill-current inline-block"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
          </svg>
          <span className="">Control</span>
        </Link>
        {user.rol !== "seller" ? (
          <>
            <Link
              to={"/dashboard/products"}
              className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-primary hover:text-white rounded-md transition duration-150 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 fill-current inline-block"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z"
                  clipRule="evenodd"
                />
              </svg>

              <span className="">Productos</span>
            </Link>
            <Link
              to={"/dashboard/sales"}
              className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-primary hover:text-white rounded-md transition duration-150 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 fill-current inline-block"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm4.5 7.5a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 0 1.5H8.25a.75.75 0 0 1-.75-.75Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5h-3.75a.75.75 0 0 1-.75-.75Zm6-1.5a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM4.5 9a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 0 1.5H5.25A.75.75 0 0 1 4.5 9Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H7.5A.75.75 0 0 1 6.75 9Zm6 1.5a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75Zm4.5 0a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0v-3.75a.75.75 0 0 1 .75-.75Zm4.5 0a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0v-3.75a.75.75 0 0 1 .75-.75Zm5.25.75a.75.75 0 0 0-1.5 0v2.25a.75.75 0 0 0 1.5 0v-2.25ZM7.5 9a.75.75 0 0 0-.75.75v.75a.75.75 0 0 0 1.5 0v-.75A.75.75 0 0 0 7.5 9Zm3 0a.75.75 0 0 0-.75.75v.75a.75.75 0 0 0 1.5 0v-.75A.75.75 0 0 0 10.5 9Zm3 .75a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75Zm3-.75a.75.75 0 0 0-.75.75v.75a.75.75 0 0 0 1.5 0v-.75a.75.75 0 0 0-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>

              <span className="">Ventas</span>
            </Link>
            <Link
              to={"/dashboard/carrousel"}
              className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-primary hover:text-white rounded-md transition duration-150 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 fill-current inline-block"
              >
              <path d="M9 5V19M15 5V19M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z" stroke="#000000" strokeWidth="0.25" 
              clipRule="evenodd"/>
              </svg>
              <span className="">Carrousel</span>
            </Link>
            <Link
              to={"/dashboard/balance"}
              className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-primary hover:text-white rounded-md transition duration-150 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 fill-current inline-block"
              >
                <path 
                d="m24,19c0,1.654-1.346,3-3,3v1c0,.552-.447,1-1,1s-1-.448-1-1v-1h-.268c-1.067,0-2.063-.574-2.598-1.499-.277-.478-.113-1.089.364-1.366.48-.278,1.091-.113,1.366.365.179.308.511.5.867.5h2.268c.552,0,1-.448,1-1,0-.378-.271-.698-.644-.76l-3.041-.507c-1.342-.223-2.315-1.373-2.315-2.733,0-1.654,1.346-3,3-3v-1c0-.552.447-1,1-1s1,.448,1,1v1h.268c1.067,0,2.063.574,2.598,1.499.277.478.113,1.089-.364,1.366-.481.276-1.091.112-1.366-.365-.179-.308-.511-.5-.867-.5h-2.268c-.552,0-1,.448-1,1,0,.378.271.698.644.76l3.041.507c1.342.223,2.315,1.373,2.315,2.733ZM7,9c-.552,0-1,.448-1,1v13c0,.552.448,1,1,1s1-.448,1-1v-13c0-.552-.448-1-1-1Zm-5,3c-.552,0-1,.448-1,1v10c0,.552.448,1,1,1s1-.448,1-1v-10c0-.552-.448-1-1-1Zm10-6c-.552,0-1,.448-1,1v16c0,.552.448,1,1,1s1-.448,1-1V7c0-.552-.448-1-1-1Zm10,2c.553,0,1-.448,1-1V1c0-.552-.447-1-1-1s-1,.448-1,1v6c0,.552.447,1,1,1Zm-5,1c.553,0,1-.448,1-1v-4c0-.552-.447-1-1-1s-1,.448-1,1v4c0,.552.447,1,1,1Z"
                clipRule="evenodd"
                />
              </svg>

              <span className=""> Balance</span>
            </Link>
            <Link
              to={"/dashboard/users"}
              className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-primary hover:text-white rounded-md transition duration-150 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 fill-current inline-block"
              >
                <path
                  fillRule="evenodd"
                  d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
                  clipRule="evenodd"
                />
                <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
              </svg>

              <span className="">Usuarios</span>
            </Link>
          </>
        ) : (
          ""
        )}

        <button
          className="w-full text-sm font-medium text-gray-700 py-2 px-2 hover:bg-primary hover:text-white rounded-md transition duration-150 ease-in-out"
          onClick={() => doSignOut()}
        >
          <svg
            className="w-6 h-6 fill-current inline-block"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 4a1 1 0 0 1 1-1h7a1 1 0 1 1 0 2H5v10h6a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1V4z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M12.293 9.293a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L13.586 14H8a1 1 0 1 1 0-2h5.586l-1.293-1.293a1 1 0 0 1 0-1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span className="">Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};
