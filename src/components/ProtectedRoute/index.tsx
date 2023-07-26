import { Outlet, useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context';

export interface Props {
  children?: React.ReactNode | null;
  redirectTo?: string;
}

function ProtectedRoute({ children, redirectTo = '/' }: Props) {
  const navigate = useNavigate();

  const { validateToken } = useContext(AuthContext);
  const [isUserLogged, setIsUserLogged] = useState(true);

  useEffect(() => {
    validateToken().then((isOkey) => setIsUserLogged(isOkey));
    if (!isUserLogged) {
      navigate(redirectTo);
    }
  }, [isUserLogged]);

  return children ?? <Outlet />;
}

export default ProtectedRoute;
