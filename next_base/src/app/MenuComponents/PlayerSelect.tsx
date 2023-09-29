import { useContext } from "react";
import { navStateProp } from "./MainMenu";
import { Button } from "../Utilities/Components/Button";
import { appContext } from "../Utilities/StateManager";

export function PlayerSelect({ setNavState }: navStateProp) {
  const { state, dispatch } = useContext(appContext);
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
          dispatch({ type: "vsAI", value: true });
          setNavState("diff");
        }}
      />
      <Button
        id="vsPlayer"
        text="2 Players"
        colorScheme="tertiary"
        onClick={() => {
          dispatch({ type: "vsAI", value: false });
          setNavState("diff");
        }}
      />
    </section>
  );
}
