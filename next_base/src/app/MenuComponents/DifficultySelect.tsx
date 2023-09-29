import { useContext } from "react";
import { navStateProp } from "./MainMenu";
import { Button } from "../Utilities/Components/Button";
import { appContext, createBoard, size } from "../Utilities/StateManager";

export function DifficultySelect({ setNavState }: navStateProp) {
  const { state, dispatch } = useContext(appContext);

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
          dispatch({ type: "color", value: createBoard(size.easy) });
          setNavState("title");
          dispatch({ type: "switch-mode", value: !state.isGame });
        }}
      />
      <Button
        id="normal"
        text="Normal (9x9)"
        colorScheme="tertiary"
        onClick={() => {
          dispatch({ type: "color", value: createBoard(size.normal) });
          setNavState("title");
          dispatch({ type: "switch-mode", value: !state.isGame });
        }}
      />
      <Button
        id="hard"
        text="Hard (14x14)"
        colorScheme="tertiary"
        onClick={() => {
          dispatch({ type: "color", value: createBoard(size.hard) });
          setNavState("title");
          dispatch({ type: "switch-mode", value: !state.isGame });
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
