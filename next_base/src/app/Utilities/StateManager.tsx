import { Dispatch, createContext } from "react";

export enum size {
  easy = 6,
  normal = 9,
  hard = 14,
}

export enum owner {
  none,
  player1,
  player2,
}

export interface Tile {
  id: string;
  col: number;
  row: number;
  owner: owner;
}

export interface state {
  isGame: boolean;
  vsAI: boolean;
  isWon: boolean;
  boardState: Tile[];
  moveArray: string[];
}

export interface action {
  type: "switch-mode" | "vsAI" | "setSize" | "win" | "color" | "push";
  value: boolean | size | Tile[] | string[];
}

export function reducer(state: state, action: action) {
  switch (action.type) {
    case "switch-mode":
      return { ...state, isGame: action.value as boolean };
    case "vsAI":
      return { ...state, vsAI: action.value as boolean };
    case "win":
      return { ...state, isWon: action.value as boolean };
    case "color":
      return { ...state, boardState: action.value as Tile[] };
    case "push":
      return { ...state, moveArray: action.value as string[] };
    default:
      return state;
  }
}

export function createBoard(size: number) {
  const emptyBoard: Tile[] = [];
  for (let i = 0; i < size * size; i++) {
    emptyBoard.push({
      id: String(i),
      row: Math.floor(i / size),
      col: i % size,
      owner: owner.none,
    });
  }
  return emptyBoard;
}

export let initialState: state = {
  isGame: false,
  vsAI: false,
  isWon: false,
  boardState: [],
  moveArray: [],
};

let initialContext: { state: state; dispatch: Dispatch<action> } = {
  state: initialState,
  dispatch: () => null,
};

export const appContext = createContext(initialContext);
