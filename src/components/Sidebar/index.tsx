/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';
import { PitchDecksIcon } from '../icons/PitchDecks';
import { ReferralSystemIcon } from '../icons/ReferralSystem';
import { SignInIcon } from '../icons/SignIn';
import { SignUpIcon } from '../icons/SignUp';
import { LogOutIcon } from '../icons/LogOut';
import { DefaultArrowIcon } from '../icons/DefaultArrow';
import { Logo } from '..';

interface Props {
  isUserLogged;
  handleActions: {
    handleButtonLogIn: () => void;
    handleButtonSignUp: () => void;
    handleButtonLogout: () => void;
  };
  sidebarIsToggled: boolean;
  setSidebarIsToggled: any;
}

export default function SidebarNavigation({
  handleActions,
  isUserLogged,
  sidebarIsToggled,
  setSidebarIsToggled,
}: Props) {
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

  const location = useLocation();

  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Sidebar
      customBreakPoint="1024px"
      width="250px"
      collapsedWidth="80px"
      backgroundColor="#FFF"
      toggled={sidebarIsToggled}
      collapsed={isCollapsed}
      rootStyles={{
        borderColor: 'white !important',
        boxShadow: '2px 0px 10px 0px rgba(0, 0, 0, 0.10)',
      }}
    >
      <Menu
        menuItemStyles={{
          button: {
            [`&.ps-active`]: {
              backgroundColor: '#F1511B',
              color: '#fff',
            },
          },
        }}
        className="relative h-full [&>ul]:h-full [&>ul]:flex [&>ul]:flex-col [&>ul]:justify-between py-5"
      >
        {/* LOGO AND MENU ICON */}
        <Menu>
          {isCollapsed ? (
            <MenuItem
              icon={<Logo width="20" height="18" />}
              onClick={() => {
                if (screenWidth > 1024) {
                  setIsCollapsed(!isCollapsed);
                }
                if (screenWidth <= 1024) {
                  setSidebarIsToggled(!sidebarIsToggled);
                }
              }}
            />
          ) : (
            <MenuItem
              suffix={<DefaultArrowIcon color="#161A20" />}
              onClick={() => {
                if (screenWidth > 1024) {
                  setIsCollapsed(!isCollapsed);
                }
                if (screenWidth <= 1024) {
                  setSidebarIsToggled(!sidebarIsToggled);
                }
              }}
            >
              <div className="flex gap-2 items-center">
                <Logo />
                <p className="font-black text-persimmon text-[20px]">
                  <span className="text-mirage">Deck</span>Link
                </p>
              </div>
            </MenuItem>
          )}
        </Menu>
        {/* <MenuItem
          icon={<Hamburguer />}
          onClick={() => {
            setIsCollapsed(!isCollapsed);
          }}
          style={{ textAlign: 'center' }}
        >
          <p className="font-black text-persimmon text-[20px]">
            <span className="text-mirage">Deck</span>Link
          </p>
        </MenuItem> */}
        {/* <div
          role="button"
          tabIndex={0}
          className="absolute top-9 right-0 p-1"
          onClick={() => setIsToggled(!isToggled)}
        >
          <DefaultArrowIcon color="#161A20" />
        </div> */}
        {isUserLogged && (
          <div>
            <MenuItem
              active={location.pathname === '/founder/decks'}
              icon={
                <PitchDecksIcon
                  color={
                    location.pathname === '/founder/decks' ? '#FFF' : '#161A20'
                  }
                />
              }
              component={<Link to="/founder/decks" />}
            >
              Pitch Decks
            </MenuItem>
            <MenuItem
              active={location.pathname === '/founder/referrals'}
              icon={
                <ReferralSystemIcon
                  color={
                    location.pathname === '/founder/referrals'
                      ? '#FFF'
                      : '#161A20'
                  }
                />
              }
              component={<Link to="/founder/referrals" />}
            >
              Referral System
            </MenuItem>
          </div>
        )}

        <div>
          {!isUserLogged ? (
            <div className="flex flex-col gap-2">
              <MenuItem
                icon={<SignInIcon />}
                onClick={handleActions.handleButtonLogIn}
              >
                Sign In
              </MenuItem>
              <MenuItem
                icon={<SignUpIcon />}
                onClick={handleActions.handleButtonSignUp}
              >
                Sign Up
              </MenuItem>
            </div>
          ) : (
            <MenuItem
              icon={<LogOutIcon color="#161A20" />}
              onClick={handleActions.handleButtonLogout}
            >
              LogOut
            </MenuItem>
          )}
        </div>
      </Menu>
    </Sidebar>
  );
}
