import React, { useEffect, useRef, useState } from "react";

const Dropdown = ({ items, title, setItem, selected }) => {
  const dropdownRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div ref={dropdownRef} className="relative inline-block text-left z-[99]">
      <button
        type="button"
        className="inline-flex justify-center align-middle items-center w-full text-sm font-medium text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected ? selected : title}
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        )}
      </button>

      {isOpen && (
        <>
          <div className="block absolute size-4 bg-white left-4 rotate-45 z-[999] border-l-2 border-t-2 border-solid border-gray-100" />
          <div className="absolute origin-top-right mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none max-h-[15pc] overflow-y-auto">
            <div className="py-1">
              {items?.map((tag, index) => (
                <h4
                  key={index}
                  className={`px-4 py-2 text-sm text-gray-700 font-medium cursor-pointer hover:bg-slate-100 ${
                    selected === tag ? "bg-slate-100" : ""
                  }`}
                  onClick={() => setItem(tag)}
                >
                  {tag}
                </h4>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dropdown;
