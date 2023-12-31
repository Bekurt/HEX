import { useEffect, useState } from "react";
import { GameBoard } from "./GameBoard";

export function BoardDisplay({ dimRef }: any) {
  const [boxSize, setboxSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    let observer = new ResizeObserver((entries) => {
      const { inlineSize: width, blockSize: height } =
        entries[0].contentBoxSize[0];
      setboxSize({ width, height });
    });

    observer.observe(dimRef.current);
    return () => {
      observer.disconnect();
    };
  }, [boxSize, dimRef]);

  return (
    <svg
      id="game-board"
      viewBox={`${-0.1 * boxSize.width} ${-0.1 * boxSize.height} ${
        boxSize.width
      } ${boxSize.height}`}
      className="h-full w-full"
    >
      <GameBoard box={boxSize} />
    </svg>
  );
}
