import { getComments } from "@/utils/fetch-data/getData";

import { Comments } from "@/components";

const CommentsContainer = async () => {
  const latestComments = await getComments();

  // on the server
  //   console.log("inside comments --> ", latestComments);

  return <Comments commentsData={latestComments} />;
};

export default CommentsContainer;
