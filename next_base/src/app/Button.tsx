import { MouseEventHandler } from "react";

interface ButtonProps {
  id: string;
  text: string;
  colorScheme: string;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
}

export function Button({ id, text, colorScheme, onClick }: ButtonProps) {
  return (
    <button
      id={id}
      className={`w-48 sm:w-64 md:w-80 lg:w-96 m-3 p-1.5 rounded-lg 
      bg-${colorScheme}-normal hover:bg-${colorScheme}-hover 
      hover:text-white text-black font-mono text-xl sm:text-2xl md:text-3xl`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
