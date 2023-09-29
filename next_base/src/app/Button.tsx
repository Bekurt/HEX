import { MouseEventHandler } from "react";

interface ButtonProps {
  id: string;
  text: string;
  colorScheme: "tertiary" | "warning";
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
}

export function Button({ id, text, colorScheme, onClick }: ButtonProps) {
  let className =
    "w-48 sm:w-64 md:w-80 lg:w-96 m-3 p-1.5 rounded-lg hover:text-white text-black font-mono text-xl sm:text-2xl md:text-3xl";
  className +=
    colorScheme === "tertiary"
      ? " bg-tertiary-normal hover:bg-tertiary-hover"
      : " bg-warning-normal hover:bg-warning-hover";

  return (
    <button id={id} className={className} onClick={onClick}>
      {text}
    </button>
  );
}
