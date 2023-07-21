import Button from '../../UI/Button';
import { Logo } from '../icons';

interface Props {
  isUserLogged: boolean;
  handleActions: {
    handleButtonLogIn: () => void;
    handleButtonSignUp: () => void;
    handleButtonLogout: () => void;
  };
}

function AuthActions({ isUserLogged, handleActions }: Props) {
  return (
    <div>
      {!isUserLogged ? (
        <div className="flex gap-1 p-1">
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
            text="Sign In"
            icon={<Logo color="#FFFFFF" width="10" height="11" />}
            backgroundColor="#F1511B"
            textColor="#FFF"
            onClick={handleActions.handleButtonSignUp}
          />
        </div>
      ) : (
        <Button
          type="button"
          text="Log Out"
          icon={<Logo />}
          textColor="#F1511B"
          onClick={handleActions.handleButtonLogout}
        />
      )}
    </div>
  );
}

export default AuthActions;
