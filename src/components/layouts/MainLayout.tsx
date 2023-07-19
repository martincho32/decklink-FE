import Navbar from '../Navbar';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export function MainLayout({ children }: Props) {
  return (
    <div className="max-w-sm md:max-w-3xl xl:max-w-8xl h-screen px-4 md:px-6 xl:px-32 pt-6 mx-auto">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
