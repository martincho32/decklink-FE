import Navbar from '../Navbar';

interface Props {
  children: JSX.Element | JSX.Element[];
}

function MainLayout({ children }: Props) {
  return (
    <div className="w-full md:max-w-5xl xl:max-w-screen-2xl px-4 md:px-4 xl:px-24 pt-6 mx-auto">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}

export default MainLayout;
