import React from "react";
import { useOrdering } from "../hooks/useOrdering";
import { useMultiFilters } from "../hooks/useMultiFilters";

interface WithOrderingAndFilterProps {
  ordering: string;
  toggleOrdering: (field: string) => void;
  filters: { [key: string]: string | null };
  setFilter: (field: string, value: string | null) => void;
  clearFilters: () => void;
}

export function withOrderingAndFilter<P extends object>(
  Component: React.ComponentType<P & WithOrderingAndFilterProps>,
  initialOrdering: string = "",
  initialFilters: { [key: string]: string | null } = {}
) {
  return (props: P) => {
    const { ordering, toggleOrdering } = useOrdering(initialOrdering);
    const { filters, setFilter, clearFilters } =
      useMultiFilters(initialFilters);

    return (
      <Component
        {...props}
        ordering={ordering}
        toggleOrdering={toggleOrdering}
        filters={filters}
        setFilter={setFilter}
        clearFilters={clearFilters}
      />
    );
  };
}
