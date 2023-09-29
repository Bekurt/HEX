export function generateLabels(
  rowNum: number,
  RAD3: number,
  sideLength: number
) {
  const counter = [];
  for (let i = 0; i < rowNum; i++) {
    counter.push(i);
  }

  const topLabels = counter.map((e) => {
    return (
      <text
        key={`topLable${e}`}
        x={(e * RAD3 + (-1 * RAD3) / 2 + RAD3 / 2) * sideLength}
        y={(1 - 1 * 1.5) * sideLength + sideLength / 4}
        style={{
          textAnchor: "middle",
          fontSize: `${sideLength / 2}px`,
          userSelect: "none",
        }}
      >
        {String.fromCharCode(65 + e)}
      </text>
    );
  });

  const bottomLabels = counter.map((e) => {
    return (
      <text
        key={`bottomLable${e}`}
        x={(e * RAD3 + (rowNum * RAD3) / 2 + RAD3 / 2) * sideLength}
        y={(1 + rowNum * 1.5) * sideLength + sideLength / 4}
        style={{
          textAnchor: "middle",
          fontSize: `${sideLength / 2}px`,
          userSelect: "none",
        }}
      >
        {String.fromCharCode(65 + e)}
      </text>
    );
  });

  const leftLabels = counter.map((e) => {
    return (
      <text
        key={`leftLable${e}`}
        x={(-1 * RAD3 + (e * RAD3) / 2 + RAD3 / 2) * sideLength}
        y={(1 + e * 1.5) * sideLength + sideLength / 4}
        style={{
          textAnchor: "middle",
          fontSize: `${sideLength / 2}px`,
          userSelect: "none",
        }}
      >
        {1 + e}
      </text>
    );
  });

  const rightLabels = counter.map((e) => {
    return (
      <text
        key={`rightLable${e}`}
        x={(rowNum * RAD3 + (e * RAD3) / 2 + RAD3 / 2) * sideLength}
        y={(1 + e * 1.5) * sideLength + sideLength / 4}
        style={{
          textAnchor: "middle",
          fontSize: `${sideLength / 2}px`,
          userSelect: "none",
        }}
      >
        {1 + e}
      </text>
    );
  });

  return (
    <>
      {topLabels}
      {bottomLabels}
      {leftLabels}
      {rightLabels}
    </>
  );
}
