export const onSelectFilter = (
  value: number | null,
  setFilter: (value: string | null) => void
) => {
  if (value === null) {
    setFilter(null);
  } else {
    setFilter(value.toString());
  }
};
