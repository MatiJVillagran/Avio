import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);

  if (!user || user.rol !== 'admin') {
    toast.error('No tienes permisos para acceder a esta seccion');
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;