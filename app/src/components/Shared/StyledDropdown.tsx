import { useEffect, useRef } from "react";

export type SelectOption = {
  value: string;
  label: string;
};

type StyledDropdownProps = {
  name: string;
  value: string;
  options: SelectOption[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (name: string, value: string) => void;
  onClose: () => void;
};

export default function StyledDropdown({
  name,
  value,
  options,
  isOpen,
  onToggle,
  onSelect,
  onClose,
}: StyledDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOption =
    options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        onClose();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div ref={dropdownRef} className="relative mt-2">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between rounded-2xl border border-[#ECE6DD] bg-white px-4 py-3.5 text-left text-[15px] font-semibold text-[#2B2A28] outline-none transition hover:border-[#E6DCCF] hover:bg-[#FBF7F1] focus:border-[#E63946] focus:ring-4 focus:ring-[#FDEAEC] active:bg-[#F6F0E8]"
      >
        <span>{selectedOption.label}</span>
        <span
          aria-hidden="true"
          className={`text-[#A89F94] transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▾
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-2xl border border-[#EFE8DD] bg-white p-1.5 shadow-[0_18px_32px_-18px_rgba(43,42,40,0.45)]">
          <div
            role="listbox"
            aria-label={name}
            className="max-h-56 overflow-auto"
          >
            {options.map((option) => {
              const isSelected = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => onSelect(name, option.value)}
                  className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm font-bold transition ${
                    isSelected
                      ? "bg-[#FDEAEC] text-[#D62F3C]"
                      : "text-[#6E665C] hover:bg-[#F6F0E8] hover:text-[#2B2A28]"
                  }`}
                >
                  <span>{option.label}</span>
                  {isSelected && (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-4 w-4 text-[#E63946]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m5 12 4 4 10-10" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
