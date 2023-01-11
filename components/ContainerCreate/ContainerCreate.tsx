interface AppProps {
  children: React.ReactNode; // best, accepts everything React can render
  error: string | undefined;
  onError: () => JSX.Element; // form events! the generic parameter is the type of event.target
}
function ContainerCreate(props: AppProps) {
  return (
    <section>
      {props.children}
      {props.error && props.onError()}
    </section>
  );
}

export default ContainerCreate;
