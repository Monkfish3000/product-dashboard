import { getAllData, getProductInfo } from "@/utils/getData";
import { ProductSearch } from "@/components";

const Nav = async () => {
  const productInfo = await getProductInfo();
  const data = await getAllData();

  console.log("data in Nav -> ", productInfo);
  console.log("ALL DATA in Nav -> ", data);
  return (
    <nav>
      {/* Search Bar */}
      <ProductSearch productInfo={productInfo} />
    </nav>
  );
};

export default Nav;
