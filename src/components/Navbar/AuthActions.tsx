import Button from '../UI/Button';
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
        <div className="flex gap-1">
          <Button
            type="button"
            text="Log In"
            icon={<Logo color="#F1511B" width="10" height="11" />}
            backgroundColor="#FDE7DF"
            textColor="#F1511B"
            onClick={handleActions.handleButtonLogIn}
            className="py-3 w-32 pr-4 relative left-4 z-0 bg-[#FDE7DF] text-persimmon"
          />
          <Button
            type="button"
            text="Sign Up"
            icon={<Logo color="#FFFFFF" width="10" height="11" />}
            backgroundColor="#F1511B"
            textColor="#FFF"
            onClick={handleActions.handleButtonSignUp}
            className="py-3 w-32 z-10"
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
