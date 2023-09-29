import type { action } from "./page";
import { Button } from "./Button";

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
      <Button
        id="vsAI"
        text="1 Player"
        colorScheme="tertiary"
        onClick={() => {
          dispatch({ type: "set-players", value: 1 });
          setNavState("difficulty");
        }}
      />
      <Button
        id="vsPlayer"
        text="2 Players"
        colorScheme="tertiary"
        onClick={() => {
          dispatch({ type: "set-players", value: 2 });
          setNavState("difficulty");
        }}
      />
    </section>
  );
}
