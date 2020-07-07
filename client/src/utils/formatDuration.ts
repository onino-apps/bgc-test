export const formatDuration = (d: number): string => {
  const hours = Math.floor(d / 3600);
  const minutes = Math.floor((d - hours * 3600) / 60);
  const seconds = d - hours * 3600 - minutes * 60;
  return `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
};

const addZero = (d: number) => {
  return d.toString().length === 1 ? "0" + d.toString() : d.toString();
};
