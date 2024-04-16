interface Props {
  children: React.ReactNode;
}
function Nav({ children }: Props) {
  return <nav>{children}</nav>;
}

export default Nav;
