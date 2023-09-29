import { MouseEventHandler } from "react";

interface ButtonProps {
  id: string;
  text: string;
  colorScheme: "tertiary" | "warning";
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
}

export function Button({ id, text, colorScheme, onClick }: ButtonProps) {
  let className =
    "w-36 sm:w-40 md:w-48 lg:w-64 xl:w-96 m-3 p-1.5 rounded-lg hover:text-white text-black font-mono text-base sm:text-lg md:text-xl lg:text-2xl xl:text-4xl";
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
