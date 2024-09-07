import { ChartsContainer, Nav, ProductInfo } from "@/components";

export default async function Dashboard() {
  return (
    <>
      <Nav />
      <ProductInfo />
      <ChartsContainer />
    </>
  );
}
