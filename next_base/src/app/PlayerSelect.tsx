import type { action } from "./page";

interface Props {
  dispatch: React.Dispatch<action>;
  setNavState: React.Dispatch<
    React.SetStateAction<"title" | "player" | "difficulty">
  >;
}

export function PlayerSelect({ dispatch, setNavState }: Props) {
  return (
    <section
      id="wrapper"
      className="w-full h-full flex justify-center items-center flex-col"
    >
      <button
        id="vsAI"
        className="w-48 sm:w-64 md:w-80 lg:w-96 m-3 p-1.5 rounded-lg bg-tertiary-normal hover:bg-tertiary-hover hover:text-white text-black font-mono text-xl sm:text-2xl md:text-3xl"
        onClick={() => {
          dispatch({ type: "set-players", value: 1 });
          setNavState("difficulty");
        }}
      >
        1 Player
      </button>
      <button
        id="vsPlayer"
        className="w-48 sm:w-64 md:w-80 lg:w-96 m-3 p-1.5 rounded-lg bg-tertiary-normal hover:bg-tertiary-hover hover:text-white text-black font-mono text-xl sm:text-2xl md:text-3xl"
        onClick={() => {
          dispatch({ type: "set-players", value: 2 });
          setNavState("difficulty");
        }}
      >
        2 Players
      </button>
    </section>
  );
}
