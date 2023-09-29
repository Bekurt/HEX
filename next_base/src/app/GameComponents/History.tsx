export function History({ moveArray }: { moveArray: string[] }) {
  const historyJSX = moveArray.map((e, i) => {
    let turn = Math.ceil(i / 2) + 1;
    if (i % 2 === 1) {
      return (
        <div
          key={`yellow-move${turn}`}
          className="w-2/5 float-left bg-player2-tile text-black text-lg pl-3 py-1"
        >
          {e}
        </div>
      );
    } else {
      return (
        <>
          <div
            key={`move${turn}`}
            className="w-1/5 float-left bg-side-title text-lg pl-3 py-1"
          >
            <strong>{turn}</strong>
          </div>
          <div
            key={`green-move${turn}`}
            className="w-2/5 float-left bg-player1-tile text-black text-lg pl-3 py-1"
          >
            {e}
          </div>
        </>
      );
    }
  });
  return (
    <div
      id="history-wrapper"
      className="w-full h-[90%] flex-grow pt-3 bg-side-body overflow-scroll"
    >
      {historyJSX}
    </div>
  );
}
