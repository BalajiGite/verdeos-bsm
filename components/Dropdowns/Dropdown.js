import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const Dropdown = ({ selected, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

// ... (previous code)

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={toggleDropdown}
          type="button"
          className="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 energy-usage-intensity-button-bg-color text-white"
          id="options-menu"
          aria-haspopup="listbox"
        >
          {selected}
          <FontAwesomeIcon icon={faAngleDown} style={{ fontSize: '20px', margin:"1px", paddingLeft:"3px" }}/>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          style={{ zIndex: "999" }}
          onMouseLeave={handleMouseLeave} // Move the onMouseLeave event here
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
                onClick={() => handleOptionClick(option.name)}
                className="block px-4 py-2 text-sm bg-black text-white cursor-pointer"
                role="menuitem"
              >
                {option.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

};

export default Dropdown;
