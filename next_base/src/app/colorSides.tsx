export function colorSides(rowNum: number, RAD3: number, sideLength: number) {
  let topString = "";
  for (let n = 0; n < rowNum - 1; n++) {
    topString += ` L${(RAD3 / 2 + n * RAD3) * sideLength},0`;
    topString += ` L${(RAD3 + n * RAD3) * sideLength},${0.5 * sideLength}`;
  }
  topString += ` L${(RAD3 / 2 + (rowNum - 1) * RAD3) * sideLength},0`;
  topString += ` L${(RAD3 * 0.75 + (rowNum - 1) * RAD3) * sideLength},${
    0.25 * sideLength
  }`;

  const topJSX = (
    <path
      className="stroke-player2-side stroke-[3px] fill-none"
      d={`M0,${0.5 * sideLength}` + topString}
    ></path>
  );

  let bottomString = "";
  for (let n = 0; n < rowNum; n++) {
    bottomString += ` L${
      (RAD3 / 2 + n * RAD3 + ((rowNum - 1) * RAD3) / 2) * sideLength
    },${(2 + (rowNum - 1) * 1.5) * sideLength}`;
    bottomString += ` L${
      (RAD3 + n * RAD3 + ((rowNum - 1) * RAD3) / 2) * sideLength
    },${(1.5 + (rowNum - 1) * 1.5) * sideLength}`;
  }

  const bottomJSX = (
    <path
      className="stroke-player2-side stroke-[3px] fill-none"
      d={
        `M${(RAD3 / 4 + ((rowNum - 1) * RAD3) / 2) * sideLength},${
          (1.75 + (rowNum - 1) * 1.5) * sideLength
        }` + bottomString
      }
    ></path>
  );

  let leftString = "";
  for (let n = 0; n < rowNum - 1; n++) {
    leftString += ` L${((n * RAD3) / 2) * sideLength},${
      (1.5 + n * 1.5) * sideLength
    }`;
    leftString += ` L${(RAD3 / 2 + (n * RAD3) / 2) * sideLength},${
      (2 + n * 1.5) * sideLength
    }`;
  }
  leftString += ` L${(((rowNum - 1) * RAD3) / 2) * sideLength},${
    (1.5 + (rowNum - 1) * 1.5) * sideLength
  }`;
  leftString += ` L${(RAD3 / 4 + ((rowNum - 1) * RAD3) / 2) * sideLength},${
    (1.75 + (rowNum - 1) * 1.5) * sideLength
  }`;
  const leftJSX = (
    <path
      className="stroke-player1-side stroke-[3px] fill-none"
      d={`M0,${0.5 * sideLength}` + leftString}
    ></path>
  );

  let rightString = "";
  for (let n = 0; n < rowNum; n++) {
    rightString += ` L${
      (RAD3 + (rowNum - 1) * RAD3 + (n * RAD3) / 2) * sideLength
    },${(0.5 + n * 1.5) * sideLength}`;
    rightString += ` L${
      (RAD3 + (rowNum - 1) * RAD3 + (n * RAD3) / 2) * sideLength
    },${(1.5 + n * 1.5) * sideLength}`;
  }

  const rightJSX = (
    <path
      className="stroke-player1-side stroke-[3px] fill-none"
      d={
        `M${(RAD3 * 0.75 + (rowNum - 1) * RAD3) * sideLength},${
          0.25 * sideLength
        }` + rightString
      }
    ></path>
  );
  return (
    <>
      {topJSX} {bottomJSX} {leftJSX} {rightJSX}
    </>
  );
}
