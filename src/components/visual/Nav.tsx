import { getAllData, getProductInfo } from "@/utils/fetch-data/getData";
import { ProductSearch } from "@/components";

const Nav = async () => {
  const productInfo = await getProductInfo();
  // const data = await getAllData();

  // console.log("productInfo in Nav -> ", productInfo);
  // console.log("ALL DATA in Nav -> ", data);

  return (
    <nav>
      {/* Search Bar */}
      <ProductSearch productInfo={productInfo} />
    </nav>
  );
};

export default Nav;
