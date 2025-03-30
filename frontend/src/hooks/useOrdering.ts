import { useState } from "react";

export const useOrdering = (initialField: string = "") => {
  const [ordering, setOrdering] = useState<string>(initialField);

  const toggleOrdering = (field: string) => {
    if (ordering === field) {
      setOrdering(`-${field}`);
    } else if (ordering === `-${field}`) {
      setOrdering(field);
    } else {
      setOrdering(field);
    }
  };

  return { ordering, toggleOrdering };
};
