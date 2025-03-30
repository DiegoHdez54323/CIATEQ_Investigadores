import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Funnel } from "lucide-react";

interface FilterButtonProps {
  options: { value: number; label: string }[];
  currentFilter: number | null;
  onSelect: (value: number | null) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  options,
  currentFilter,
  onSelect,
}) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownStyles, setDropdownStyles] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownStyles({
        position: "absolute",
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: "8rem",
      });
    }
  }, [open]);

  const handleSelect = (value: number | null) => {
    onSelect(value);
    setOpen(false);
  };

  return (
    <div className="relative ml-2">
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="focus:outline-none"
      >
        <span>
          <Funnel size={14} />
        </span>
      </button>
      {open &&
        ReactDOM.createPortal(
          <div
            style={dropdownStyles}
            className="bg-white shadow-md rounded-md z-50"
          >
            <ul>
              <li>
                <button
                  onClick={() => handleSelect(null)}
                  className="block w-full text-left px-2 py-1 hover:bg-gray-100"
                >
                  Todos
                </button>
              </li>
              {options.map((opt) => (
                <li key={opt.value}>
                  <button
                    onClick={() => handleSelect(opt.value)}
                    className="block w-full text-left px-2 py-1 hover:bg-gray-100"
                  >
                    {opt.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>,
          document.getElementById("dropdown-root") as HTMLElement
        )}
    </div>
  );
};

export default FilterButton;
