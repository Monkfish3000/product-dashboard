import { getProductNames } from "@/utils/getData";
import { ProductSearch } from "@/components";

const Nav = async () => {
  const productNames = await getProductNames();

  console.log("data in Nav -> ", productNames);
  return (
    <nav>
      {/* Search Bar */}
      <ProductSearch productNames={productNames} />
    </nav>
  );
};

export default Nav;
