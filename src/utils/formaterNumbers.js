export default function formatNumber(num) {
  if (num >= 1000000000000) {
      return (num / 1000000000000).toFixed(1).replace(/\.0$/, '') + 'tri';
  }
  if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'bi';
  }
  if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'mi';
  }
  if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return num;
}