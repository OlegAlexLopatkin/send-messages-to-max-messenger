export function getRandomNumber(from: number, to: number) {
  if (from >= to) {
    throw new Error("From greater than or equal to");
  }

  return from + (to - from) * Math.random();
}
