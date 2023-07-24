import { Navigate, Outlet } from 'react-router-dom';

export interface Props {
  user: unknown;
  children?: React.ReactNode | null;
  redirectTo?: string;
}

function ProtectedRoute({ user, children, redirectTo = '/' }: Props) {
  if (!user) {
    return <Navigate to={redirectTo} />;
  }

  return children ?? <Outlet />;
}

export default ProtectedRoute;
