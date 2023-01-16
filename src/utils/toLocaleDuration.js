export const toLocaleDuration = (minutes) => {
  const hh = Math.floor(minutes / 60);
  const mm = Math.floor(minutes % 60);

  return `${hh > 0 ? hh + "ч " : ""}${mm + "м"}`;
};
