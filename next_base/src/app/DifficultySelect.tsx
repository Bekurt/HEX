import { drillProp } from "./MainMenu";

interface DifficultyProps {
  switchInterface: drillProp<"menu" | "game">;
  setChoice: drillProp<{ boardSize: number; playerNum: number }>;
  setNavState: drillProp<"title" | "player" | "difficulty">;
  playerChoice: { boardSize: number; playerNum: number };
}

export function DifficultySelect({
  switchInterface,
  setChoice,
  setNavState,
  playerChoice,
}: DifficultyProps) {
  return (
    <section
      id="wrapper"
      className="w-full h-full flex justify-center items-center flex-wrap flex-col"
    >
      <button
        id="easy"
        className="w-48 sm:w-64 md:w-80 lg:w-96 m-1 md:m-3 p-1.5 rounded-lg bg-tertiary-normal hover:bg-tertiary-hover hover:text-white text-black font-mono text-lg sm:text-xl md:text-2xl"
        onClick={() => {
          setChoice({ ...playerChoice, boardSize: 6 });
          setNavState("title");
          switchInterface("game");
        }}
      >
        Easy (6x6)
      </button>
      <button
        id="normal"
        className="w-48 sm:w-64 md:w-80 lg:w-96 m-1 md:m-3 p-1.5 rounded-lg bg-tertiary-normal hover:bg-tertiary-hover hover:text-white text-black font-mono text-lg sm:text-xl md:text-2xl"
        onClick={() => {
          setChoice({ ...playerChoice, boardSize: 9 });
          setNavState("title");
          switchInterface("game");
        }}
      >
        Normal (9x9)
      </button>
      <button
        id="hard"
        className="w-48 sm:w-64 md:w-80 lg:w-96 m-1 md:m-3 p-1.5 rounded-lg bg-tertiary-normal hover:bg-tertiary-hover hover:text-white text-black font-mono text-lg sm:text-xl md:text-2xl"
        onClick={() => {
          setChoice({ ...playerChoice, boardSize: 14 });
          setNavState("title");
          switchInterface("game");
        }}
      >
        Hard (14x14)
      </button>
      <button
        id="back"
        className="w-48 sm:w-64 md:w-80 lg:w-96 m-1 md:m-3 p-1.5 rounded-lg bg-warning-normal hover:bg-warning-hover hover:text-white text-black font-mono text-lg sm:text-xl md:text-2xl"
        onClick={() => {
          setNavState("player");
        }}
      >
        Back
      </button>
    </section>
  );
}
