interface Props {
  children: JSX.Element;
}

export function Layout({ children }: Props) {
  return (
    <>
      <header>
        <nav />
      </header>
      <main>{children}</main>
    </>
  );
}
