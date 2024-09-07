import { getProductNames } from "@/utils/getData";
import { ProductSearch } from "@/components";

const Nav = async () => {
  const data = await getProductNames();

  // console.log("data in Nav -> ", data);
  return (
    <nav>
      {/* Search Bar */}
      <ProductSearch products={data} />
    </nav>
  );
};

export default Nav;
