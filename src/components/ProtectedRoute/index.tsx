import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export interface Props {
  children?: React.ReactNode | null;
  redirectTo?: string;
}

function ProtectedRoute({ children, redirectTo = '/' }: Props) {
  const { user } = useAuth();

  if (!user?.authToken) {
    return <Navigate to={redirectTo} />;
  }

  return children ?? <Outlet />;
}

export default ProtectedRoute;
