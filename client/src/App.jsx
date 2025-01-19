import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUserFromSession } from "./redux/actions/actions";
import { useEffect } from "react";
import Login from "./pages/dashboard/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Products from "./pages/dashboard/Products";
import Sales from "./pages/dashboard/Sales";
import Support from "./pages/dashboard/Support";
import Users from "./pages/dashboard/Users";
import Error from "./pages/dashboard/Error";
import Home from "./pages/ecommerce/Home";
import Balance from "./pages/dashboard/Balance";
import CartPage from "./pages/ecommerce/CartPage";
import Register from "./pages/dashboard/Register";
import ProductDetail from "./pages/ecommerce/ProductDetail";
import AllProducts from "./pages/ecommerce/AllProducts";
import Purchase from "./pages/ecommerce/Purchase";
import { ImageGallery } from "./pages/dashboard/ImageGallery";
import AboutUs from "./pages/ecommerce/AboutUs";
import ProtectedRoute from "./firebase/ProtectedRoute";
import Suppliers from "./pages/ecommerce/Suppliers";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    dispatch(authenticateUserFromSession());
  }, [dispatch]);

  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/userpurchase/:id" element={<Purchase />} />
        <Route path="/product" element={<AllProducts />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/suppliers" element={<Suppliers />} />
        {isAuth ? (
          <>
            <Route path="/dashboard/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
            <Route path="/dashboard/sales" element={<ProtectedRoute><Sales /></ProtectedRoute>} />
            <Route path="/dashboard/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
            <Route path="/dashboard/carrousel" element={<ProtectedRoute><ImageGallery /></ProtectedRoute>} />
            <Route path="/dashboard/balance" element={<ProtectedRoute><Balance /></ProtectedRoute>} />
            <Route path="/dashboard/support" element={<ProtectedRoute><Support /></ProtectedRoute>} />
          </>
        ) : (
          <Route path="/error" element={<Error />} />
        )}
      </Routes>
    </div>
  );
}

export default App;