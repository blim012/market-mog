export default function secondsToDate(seconds) {
  let date = new Date(null);
  date.setTime(seconds * 1000);
  return date.toLocaleString();
};