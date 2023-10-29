import React, { useState } from "react";

const Dropdown = ({ selected, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={toggleDropdown}
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 energy-usage-intensity-button-bg-color text-white"
          id="options-menu"
          aria-haspopup="listbox"
        >
          {selected}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2 -mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 7.414 5.707 11.707a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          style={{ "z-index": "999" }}
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleOptionClick(option.name)} // Use the 'value' property
                className="block px-4 py-2 text-sm bg-black text-white cursor-pointer"
                role="menuitem"
              >
                {option.name} {/* Display the 'value' property */}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
