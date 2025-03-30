import React from "react";
import classNames from "classnames";
import {
  ArrowDownToLine,
  ArrowUpToLine,
  ArrowUpDown,
  Funnel,
} from "lucide-react";

interface SortButtonProps {
  field: string;
  ordering: string;
  toggleOrdering: (field: string) => void;
}

const SortButton: React.FC<SortButtonProps> = ({
  field,
  ordering,
  toggleOrdering,
}) => {
  const getIcon = () => {
    if (ordering === field) return <ArrowUpToLine size={14} />;
    else if (ordering === `-${field}`) return <ArrowDownToLine size={14} />;
    else return <ArrowUpDown size={14} />;
  };

  return (
    <button
      onClick={() => toggleOrdering(field)}
      className="ml-2 focus:outline-none"
    >
      <span
        className={classNames(
          "text-base",
          ordering === field || ordering === `-${field}`
            ? "text-gray-600"
            : "text-gray-600"
        )}
      >
        {getIcon()}
      </span>
    </button>
  );
};

export default SortButton;
