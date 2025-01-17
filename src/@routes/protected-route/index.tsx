import { Navigate } from 'react-router-dom';
import { tokenService } from '../../services/tokenService';

interface IProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = !!tokenService.getToken();
  return isAuthenticated ? <>{children}</> : <Navigate to='/auth' replace />;
};
