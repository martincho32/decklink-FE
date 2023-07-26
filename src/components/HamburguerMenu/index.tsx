import Button from '../UI/Button';
import { Hamburguer, Logo, CloseIcon } from '../icons';
import NavLinks from './NavLinks';

interface Props {
  onClickHamburguer: () => void;
  isUserLogged: boolean;
  isOpen: boolean;
  handleActions: {
    handleButtonLogIn: () => void;
    handleButtonSignUp: () => void;
    handleButtonLogout: () => void;
  };
}

function HamburguerMenu({
  onClickHamburguer,
  isUserLogged,
  isOpen,
  handleActions,
}: Props) {
  return (
    <div className="block md:hidden">
      {!isOpen ? (
        <button type="button" onClick={onClickHamburguer}>
          <Hamburguer />
        </button>
      ) : null}
      <div
        style={{
          position: 'absolute',
          inset: '0',
          flexDirection: 'column',
          width: '100vw',
          background: 'white',
          height: '100vmax',
          zIndex: '2',
        }}
        className={isOpen ? 'flex' : 'hidden'}
      >
        <button
          className="ml-auto mt-1 mr-2"
          type="button"
          onClick={onClickHamburguer}
        >
          <CloseIcon />
        </button>
        <NavLinks />
        {!isUserLogged ? (
          <div className="flex flex-col gap-1 p-1 mt-auto">
            <Button
              type="button"
              text="Log In"
              icon={<Logo color="#FFFFFF" width="10" height="11" />}
              backgroundColor="#F1511B"
              textColor="#FFF"
              onClick={handleActions.handleButtonLogIn}
            />
            <Button
              type="button"
              text="Sign Up"
              icon={<Logo color="#FFFFFF" width="10" height="11" />}
              backgroundColor="#F1511B"
              textColor="#FFF"
              onClick={handleActions.handleButtonSignUp}
            />
          </div>
        ) : (
          <div className="mt-auto mx-auto w-full">
            <Button
              type="button"
              text="Log Out"
              icon={<Logo color="#FFFFFF" width="10" height="11" />}
              backgroundColor="#F1511B"
              textColor="#FFF"
              onClick={handleActions.handleButtonLogout}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default HamburguerMenu;
