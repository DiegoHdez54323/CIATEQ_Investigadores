import { useState } from "react";

export function useFilter<T>(
  initialValue: T
): [T, (value: T) => void, () => void] {
  const [filter, setFilter] = useState<T>(initialValue);
  const clearFilter = () => setFilter(initialValue);
  return [filter, setFilter, clearFilter];
}
