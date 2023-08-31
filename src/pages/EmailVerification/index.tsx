import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import whiteTopRightArrow from '../../assets/images/ArrowTopRight.svg';
import { AuthLayout, Button } from '@/components';
import { AuthContext } from '@/context';

function EmailVerification() {
  const { verifyEmail } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const params = useParams();

  const onButtonClick = async () => {
    const { hasError, message } = await verifyEmail(params.token as string);

    if (!hasError) {
      navigate('/login');
    } else {
      enqueueSnackbar(message, {
        variant: 'error',
        autoHideDuration: 5000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col gap-7 my-auto items-center justify-center w-full">
        <h1 className="text-mirage text-[2.25rem] font-black">
          Email Verification
        </h1>
        <p className="text-mirage text-center font-[NeuePlak]">
          You succesfully verified your email. Now you can Sign In.
        </p>
        <Button
          id="signup-button"
          type="button"
          text="Sign In"
          icon={<img src={whiteTopRightArrow} alt="Arrow" />}
          backgroundColor="#F1511B"
          textColor="#FFF"
          className="w-full mobilev:!max-w-[24rem] tablet:!max-w-none"
          onClick={onButtonClick}
        />
      </div>
    </AuthLayout>
  );
}

export default EmailVerification;
