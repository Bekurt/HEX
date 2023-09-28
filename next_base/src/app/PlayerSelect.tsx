import { drillProp } from "./MainMenu";

interface PlayerProps {
  setChoice: drillProp<{ boardSize: number; playerNum: number }>;
  setNavState: drillProp<"title" | "player" | "difficulty">;
  playerChoice: { boardSize: number; playerNum: number };
}

export function PlayerSelect({
  setChoice,
  setNavState,
  playerChoice,
}: PlayerProps) {
  return (
    <section
      id="wrapper"
      className="w-full h-full flex justify-center items-center flex-col"
    >
      <button
        id="vsAI"
        className="w-48 sm:w-64 md:w-80 lg:w-96 m-3 p-1.5 rounded-lg bg-tertiary-normal hover:bg-tertiary-hover hover:text-white text-black font-mono text-xl sm:text-2xl md:text-3xl"
        onClick={() => {
          setChoice({ ...playerChoice, playerNum: 1 });
          setNavState("difficulty");
        }}
      >
        1 Player
      </button>
      <button
        id="vsPlayer"
        className="w-48 sm:w-64 md:w-80 lg:w-96 m-3 p-1.5 rounded-lg bg-tertiary-normal hover:bg-tertiary-hover hover:text-white text-black font-mono text-xl sm:text-2xl md:text-3xl"
        onClick={() => {
          setChoice({ ...playerChoice, playerNum: 2 });
          setNavState("difficulty");
        }}
      >
        2 Players
      </button>
    </section>
  );
}
