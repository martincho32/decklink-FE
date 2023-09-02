import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hamburguer, Logo, SidebarNavigation } from '@/components';
import { AuthContext } from '@/context';

interface Props {
  children: JSX.Element | JSX.Element[];
}

function MainLayout({ children }: Props) {
  const [sidebarIsToggled, setSidebarIsToggled] = useState(false);
  const { isLoggedIn, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleActions = {
    handleButtonLogIn: (): void => {
      navigate('/login');
    },
    handleButtonSignUp: (): void => {
      navigate('/signup');
    },
    handleButtonLogout: (): void => {
      logoutUser();
      navigate('/');
    },
  };

  return (
    <div className="w-screen h-screen flex overflow-hidden">
      <SidebarNavigation
        handleActions={handleActions}
        isUserLogged={isLoggedIn}
        sidebarIsToggled={sidebarIsToggled}
        setSidebarIsToggled={setSidebarIsToggled}
      />
      <main className="h-full w-full overflow-y-auto p-5 flex flex-col gap-8">
        {screenWidth <= 1024 && !sidebarIsToggled && (
          <div className="flex justify-between items-center">
            <div
              tabIndex={0}
              role="button"
              onClick={() => {
                setSidebarIsToggled(!sidebarIsToggled);
              }}
            >
              <Hamburguer />
            </div>
            <div className="flex gap-2 items-center">
              <Logo width="20" height="18" />
              <p className="font-black text-persimmon text-[24px]">
                <span className="text-mirage">Deck</span>Link
              </p>
            </div>
            <div />
          </div>
        )}

        {children}
      </main>
    </div>
  );
}

export default MainLayout;
