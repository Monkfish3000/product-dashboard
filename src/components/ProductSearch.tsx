"use client";

const ProductSearch = ({ products }) => {
  console.log("inside ProductSearch --> ", products);
  return (
    <div className="flex items-center justify-between space-x-4 w-full max-w-lg">
      <input type="text" placeholder="Search product or select from list..." />
      {/* <h1 className="font-bold text-xl whitespace-nowrap absolute left-1/2 transform -translate-x-1/2">
        {`Viewing data for ${products[0]}`}
      </h1> */}
    </div>
  );
};

export default ProductSearch;
