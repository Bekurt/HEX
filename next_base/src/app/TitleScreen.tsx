type TitleProp = {
  setNavState: React.Dispatch<
    React.SetStateAction<"title" | "player" | "difficulty">
  >;
};

export function TitleScreen({ setNavState }: TitleProp) {
  return (
    <section
      id="wrapper"
      className="w-full h-full flex justify-center items-center flex-col"
      onClick={() => setNavState("player")}
    >
      <h1
        id="title"
        className="text-black text-center mb-1 cursor-pointer text-5xl sm:text-6xl md:text-8xl lg:text-9xl"
      >
        HEX
      </h1>
      <h2
        id="sub-title"
        className="font-mono text-black text-center animate-pulse cursor-pointer text-lg sm:text-xl md:text-3xl lg:text-4xl"
      >
        <em>Click to start</em>
      </h2>
    </section>
  );
}
