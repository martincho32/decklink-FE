import { useLocation } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { AuthLayout } from '@/components';

function SendEmailVerification() {
  const location = useLocation();
  const { email } = location.state;

  return (
    <AuthLayout>
      <div className="flex flex-col gap-7 my-auto items-center justify-center w-full">
        <h1 className="text-mirage text-[2.25rem] font-black">
          Email Verification
        </h1>
        <p className="text-mirage text-center font-[NeuePlak]">
          A message has been sent to{' '}
          <strong className="font-bold text-persimmon">{email}</strong> to
          verify your email.
        </p>
        <p className="text-mirage text-[0.875rem] opacity-40">
          You can close this tab now.
        </p>
      </div>
    </AuthLayout>
  );
}

export default SendEmailVerification;
