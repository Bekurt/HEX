interface props {
  id: string;
  text: string;
  color: string;
}

export function Header({ id, text, color }: props) {
  return (
    <header
      id={id}
      className={
        "text-white p-2 lg:p-2.5 xl:p-3 2xl:p-3.5 text-sm lg:text-base xl:text-lg 2xl:text-xl h-[10%] max-h-16 flex-shrink-0 " +
        color
      }
      style={{ textShadow: "0 0 2px black" }}
    >
      <strong>{text}</strong>
    </header>
  );
}
