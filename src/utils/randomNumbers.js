export default function randomNumbers(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
