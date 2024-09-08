export type CommentData = {
  productId: number;
  comments: {
    id: number;
    author: string;
    text: string;
  }[];
};
