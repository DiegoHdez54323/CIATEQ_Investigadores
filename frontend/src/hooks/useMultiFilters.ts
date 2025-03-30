import { useState } from "react";

export function useMultiFilters<T extends { [key: string]: string | null }>(
  initialFilters: T
) {
  const [filters, setFilters] = useState<T>(initialFilters);

  const setFilter = (field: string, value: string | null) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  return { filters, setFilter, clearFilters };
}
