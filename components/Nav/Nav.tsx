import styles from "./Nav.module.scss";

interface Props {
  children: React.ReactNode;
}
function Nav({ children }: Props) {
  return <nav className={styles.Wrapper}>{children}</nav>;
}

export default Nav;
