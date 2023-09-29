import { dispatchContext } from "../page";
import { Button } from "../Utilities/Button";
import { useContext } from "react";

interface Props {
  setNavState: React.Dispatch<
    React.SetStateAction<"title" | "player" | "difficulty">
  >;
}
export function DifficultySelect({ setNavState }: Props) {
  const dispatch = useContext(dispatchContext);

  return (
    <section
      id="wrapper"
      className="w-full h-full flex justify-center items-center flex-wrap flex-col"
    >
      <Button
        id="easy"
        text="Easy (6x6)"
        colorScheme="tertiary"
        onClick={() => {
          dispatch({ type: "set-size", value: 6 });
          setNavState("title");
          dispatch({ type: "switch-mode" });
        }}
      />
      <Button
        id="normal"
        text="Normal (9x9)"
        colorScheme="tertiary"
        onClick={() => {
          dispatch({ type: "set-size", value: 9 });
          setNavState("title");
          dispatch({ type: "switch-mode" });
        }}
      />
      <Button
        id="hard"
        text="Hard (14x14)"
        colorScheme="tertiary"
        onClick={() => {
          dispatch({ type: "set-size", value: 14 });
          setNavState("title");
          dispatch({ type: "switch-mode" });
        }}
      />
      <Button
        id="back"
        text="Back"
        colorScheme="warning"
        onClick={() => {
          setNavState("player");
        }}
      />
    </section>
  );
}
