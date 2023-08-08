import Navbar from '../Navbar';

interface Props {
  children: JSX.Element | JSX.Element[];
}

function MainLayout({ children }: Props) {
  return (
    <div className="w-full desktop:px-16 tablet:px-8 mobileh:px-5 mobilev:px-4">
      <div className="desktop:pt-8 tablet:pt-6 pt-2 mx-auto w-full max-w-custom">
        <Navbar />
        <main>{children}</main>
      </div>
    </div>
  );
}

export default MainLayout;
