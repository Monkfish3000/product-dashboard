"use client";
import { useState, useEffect, useRef } from "react";
import { useProduct } from "@/utils/context/ProductContext";

import { ProductInfo, ProductSearchProps } from "@/utils/types";

const ProductSearch: React.FC<ProductSearchProps> = ({ productInfo }) => {
  // console.log("inside ProductSearch --> ", productInfo);

  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { selectedProd, setSelectedProd } = useProduct();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredProducts = productInfo.filter((item) =>
    item.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductSelect = (product: ProductInfo) => {
    setSelectedProd(product);
    setSearchTerm(product.productName);
    setDropdownOpen(false);
  };

  // handle closing the dropdown from user interaction
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
        setSearchTerm("");
      }
    };

    const handleEscKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
        setSearchTerm("");
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
      document.removeEventListener("keydown", handleEscKeyDown);
    };
  }, [dropdownOpen]);

  // Handle keyboard selecting options
  useEffect(() => {
    const handleKeyNavigation = (event: KeyboardEvent) => {
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

  console.log("inside ProductSearch --> ", selectedProd);

  return (
    <div ref={dropdownRef} className="relative w-full max-w-lg">
      <input
        ref={inputRef}
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
                key={product.productId}
                onClick={() => handleProductSelect(product)}
                className={`cursor-pointer p-2 hover:bg-gray-200 ${
                  index === highlightedIndex ? "bg-gray-300" : ""
                }`}
              >
                {product.productName}
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
