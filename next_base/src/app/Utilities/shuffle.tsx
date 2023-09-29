// Fisher-Yates random shuffle algorithm
export function shuffle<T>(array: T[]) {
  for (let index = array.length - 1; index > 0; index--) {
    const randIdx = Math.floor(Math.random() * index);
    const memory = array[index];
    array[index] = array[randIdx];
    array[randIdx] = memory;
  }
  return array;
}
