interface props {
  id: string;
  width: string;
  children: any;
}

export function Section({ id, width, children }: props) {
  return (
    <section
      id={id}
      className={width + " h-full flex flex-col overflow-hidden"}
    >
      {children}
    </section>
  );
}
