import { useContext } from "react";
import { Button } from "../Utilities/Components/Button";
import { appContext, owner, createBoard } from "../Utilities/StateManager";

export function WinNotification() {
  const { state, dispatch } = useContext(appContext);

  let turn = state.boardState.filter((e) => e.owner !== owner.none).length;
  let currentPlayer = turn % 2 == 0 ? "Yellow" : "Green";

  return (
    <div
      id="modal-window"
      className="h-full w-full bg-black bg-opacity-70 absolute z-10"
    >
      <div
        id="wrapper"
        className="flex justify-center items-center w-full h-full"
      >
        <div
          id="modal-notification"
          className="flex flex-wrap justify-center items-center w-2/3 h-1/4 rounded-3xl mx-auto bg-secondary"
        >
          <span
            id="message"
            className="w-full select-none text-black text-center text-2xl lg:text-3xl xl:text-4xl"
          >
            {currentPlayer} player won!
          </span>
          <Button
            id="reset"
            text="New Game"
            colorScheme="tertiary"
            onClick={() => {
              const newBoard = createBoard(Math.sqrt(state.boardState.length));
              dispatch({ type: "color", value: newBoard });
              dispatch({ type: "push", value: [] });
              dispatch({ type: "win", value: false });
            }}
          />
          <Button
            id="back"
            text="Menu"
            colorScheme="warning"
            onClick={() => {
              dispatch({ type: "switch-mode", value: !state.isGame });
              dispatch({ type: "win", value: false });
              dispatch({ type: "push", value: [] });
            }}
          />
        </div>
      </div>
    </div>
  );
}
