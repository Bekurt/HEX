import { useState } from "react";

type drillProp<T> = React.Dispatch<React.SetStateAction<T>>;

interface MenuProps {
  switchInterface: drillProp<"menu" | "game">;
  setChoice: drillProp<{ boardSize: number; playerNum: number }>;
  playerChoice: { boardSize: number; playerNum: number };
}

export function MainMenu({
  switchInterface,
  setChoice,
  playerChoice,
}: MenuProps) {
  let [navState, setNavState] = useState(
    "title" as "title" | "player" | "difficulty"
  );

  return (
    <div
      id="background"
      className="w-full h-full flex items-center bg-hexTri bg-[length:1400px_840px] bg-center animate-marqee overflow-hidden"
    >
      <div
        id="menu-bar"
        className="w-full h-2/5 border border-black bg-sky-500"
      >
        {navState === "title" && <TitleScreen setNavState={setNavState} />}
        {navState === "player" && (
          <PlayerSelect
            setChoice={setChoice}
            setNavState={setNavState}
            playerChoice={playerChoice}
          />
        )}
        {navState === "difficulty" && (
          <DifficultySelect
            switchInterface={switchInterface}
            setChoice={setChoice}
            setNavState={setNavState}
            playerChoice={playerChoice}
          />
        )}
      </div>
    </div>
  );
}

type TitleProp = {
  setNavState: drillProp<"title" | "player" | "difficulty">;
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
        className="text-zinc-900 text-center mb-1 cursor-pointer text-5xl sm:text-6xl md:text-8xl lg:text-9xl"
      >
        HEX
      </h1>
      <h2
        id="sub-title"
        className="font-mono text-zinc-950 text-center animate-pulse cursor-pointer text-lg sm:text-xl md:text-3xl lg:text-4xl"
      >
        <em>Click to start</em>
      </h2>
    </section>
  );
}

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
        className="w-48 sm:w-64 md:w-80 lg:w-96 m-3 p-1.5 rounded-lg bg-sky-400 hover:bg-blue-300 text-black font-mono text-xl sm:text-2xl md:text-3xl"
        onClick={() => {
          setChoice({ ...playerChoice, playerNum: 1 });
          setNavState("difficulty");
        }}
      >
        1 Player
      </button>
      <button
        id="vsPlayer"
        className="w-48 sm:w-64 md:w-80 lg:w-96 m-3 p-1.5 rounded-lg bg-sky-400 hover:bg-blue-300 text-black font-mono text-xl sm:text-2xl md:text-3xl"
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

interface DifficultyProps extends PlayerProps {
  switchInterface: drillProp<"menu" | "game">;
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
        className="w-48 sm:w-64 md:w-80 lg:w-96 m-1 md:m-3 p-1.5 rounded-lg bg-sky-700 hover:bg-blue-300 text-white hover:text-black font-mono text-lg sm:text-xl md:text-2xl"
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
        className="w-48 sm:w-64 md:w-80 lg:w-96 m-1 md:m-3 p-1.5 rounded-lg bg-sky-700 hover:bg-blue-300 text-white hover:text-black font-mono text-lg sm:text-xl md:text-2xl"
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
        className="w-48 sm:w-64 md:w-80 lg:w-96 m-1 md:m-3 p-1.5 rounded-lg bg-sky-700 hover:bg-blue-300 text-white hover:text-black font-mono text-lg sm:text-xl md:text-2xl"
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
        className="w-48 sm:w-64 md:w-80 lg:w-96 m-1 md:m-3 p-1.5 rounded-lg bg-orange-800 hover:bg-yellow-500 text-white hover:text-black font-mono text-lg sm:text-xl md:text-2xl"
        onClick={() => {
          setNavState("player");
        }}
      >
        Back
      </button>
    </section>
  );
}
