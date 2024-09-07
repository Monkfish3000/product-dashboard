"use client";

import { useState, useEffect, useRef } from "react";

const ProductSearch = ({ products }) => {
  console.log("inside ProductSearch --> ", products);

  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const filteredProducts = products.filter((product) =>
    product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setSearchTerm(product);
    setDropdownOpen(false);
  };

  // handle closing the dropdown from user interaction
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    const handleEscKeyDown = (event) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    if (dropdownOpen) {
      document.addEventListener("keydown", handleEscKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // Handle keyboard selecting options
  useEffect(() => {
    const handleKeyNavigation = (event) => {
      if (!dropdownOpen) return;

      if (event.key === "ArrowDown") {
        setHighlightedIndex((prevIndex) =>
          prevIndex < filteredProducts.length - 1 ? prevIndex + 1 : 0
        );
      } else if (event.key === "ArrowUp") {
        setHighlightedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : filteredProducts.length - 1
        );
      } else if (event.key === "Enter") {
        if (
          highlightedIndex >= 0 &&
          highlightedIndex < filteredProducts.length
        ) {
          handleProductSelect(filteredProducts[highlightedIndex]);
        }
      }
    };

    document.addEventListener("keydown", handleKeyNavigation);

    return () => {
      document.removeEventListener("keydown", handleKeyNavigation);
    };
  }, [dropdownOpen, highlightedIndex, filteredProducts]);

  return (
    <div ref={dropdownRef} className="relative w-full max-w-lg">
      <input
        type="text"
        placeholder="Search product or select from list..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setDropdownOpen(true);
        }}
        onFocus={() => setDropdownOpen(true)}
        className="border p-2 rounded w-full"
      />
      {dropdownOpen && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-60 overflow-auto">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <li
                key={index}
                onClick={() => handleProductSelect(product)}
                className={`cursor-pointer p-2 hover:bg-gray-200 ${
                  index === highlightedIndex ? "bg-gray-300" : ""
                }`}
              >
                {product}
              </li>
            ))
          ) : (
            <li className="p-2 text-primary-gray">No products found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default ProductSearch;
