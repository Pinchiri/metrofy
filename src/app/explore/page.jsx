import { getCategoriesNeo4J } from "../../../neo4j";
import ExploreView from "./exploreView";

export const Explore = async () => {
  const categories = await getCategoriesNeo4J();

  return (
    <>
      <ExploreView categories={categories} />
    </>
  );
};

export default Explore;
