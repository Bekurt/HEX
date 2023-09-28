import type { action } from "./page";

interface Props {
  dispatch: React.Dispatch<action>;
  setNavState: React.Dispatch<
    React.SetStateAction<"title" | "player" | "difficulty">
  >;
}
export function DifficultySelect({ dispatch, setNavState }: Props) {
  return (
    <section
      id="wrapper"
      className="w-full h-full flex justify-center items-center flex-wrap flex-col"
    >
      <button
        id="easy"
        className="w-48 sm:w-64 md:w-80 lg:w-96 m-1 md:m-3 p-1.5 rounded-lg bg-tertiary-normal hover:bg-tertiary-hover hover:text-white text-black font-mono text-lg sm:text-xl md:text-2xl"
        onClick={() => {
          dispatch({ type: "set-size", value: 6 });
          setNavState("title");
          dispatch({ type: "switch-mode" });
        }}
      >
        Easy (6x6)
      </button>
      <button
        id="normal"
        className="w-48 sm:w-64 md:w-80 lg:w-96 m-1 md:m-3 p-1.5 rounded-lg bg-tertiary-normal hover:bg-tertiary-hover hover:text-white text-black font-mono text-lg sm:text-xl md:text-2xl"
        onClick={() => {
          dispatch({ type: "set-size", value: 9 });
          setNavState("title");
          dispatch({ type: "switch-mode" });
        }}
      >
        Normal (9x9)
      </button>
      <button
        id="hard"
        className="w-48 sm:w-64 md:w-80 lg:w-96 m-1 md:m-3 p-1.5 rounded-lg bg-tertiary-normal hover:bg-tertiary-hover hover:text-white text-black font-mono text-lg sm:text-xl md:text-2xl"
        onClick={() => {
          dispatch({ type: "set-size", value: 14 });
          setNavState("title");
          dispatch({ type: "switch-mode" });
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
