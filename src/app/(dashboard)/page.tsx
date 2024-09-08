import {
  ChartsContainer,
  Nav,
  ProductInfo,
  CommentsContainer,
} from "@/components";

export default async function Dashboard() {
  return (
    <>
      <Nav />
      <ProductInfo />
      <ChartsContainer />
      <CommentsContainer />
    </>
  );
}
