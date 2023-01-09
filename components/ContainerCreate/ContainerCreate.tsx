function ContainerCreate(props: any) {
  return (
    <section>
      {props.children}
      {props.error && props.onError()}
    </section>
  );
}

export default ContainerCreate;
