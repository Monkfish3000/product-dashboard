"use client";
import { useState, useEffect } from "react";

import { useProduct } from "@/utils/context/ProductContext";
import { CommentData } from "@/utils/types/comments-types/comments-types";

const Comment: React.FC<{ commentsData: CommentData[] }> = ({
  commentsData,
}) => {
  const { selectedProd } = useProduct();
  const [productComments, setProductComments] = useState<CommentData | null>(
    null
  );

  useEffect(() => {
    if (selectedProd) {
      const commentsForProduct = commentsData.find(
        (data) => data.productId === selectedProd.productId
      );
      setProductComments(commentsForProduct || null);
    }
  }, [selectedProd, commentsData]);

  return selectedProd ? (
    <>
      <h2 className="chartHeader w-full opacity-50">
        Latest Customer Comments
      </h2>
      <div className="commentsSection text-left w-full opacity-80 shadow-xl">
        {productComments?.comments?.length ? (
          productComments.comments.map(({ id, author, text }) => (
            <div key={id} className="comment">
              <p>
                <strong>{author}</strong>
              </p>
              <p>{text}</p>
            </div>
          ))
        ) : (
          <p>No comments available for this product.</p>
        )}
      </div>
    </>
  ) : null;
};

export default Comment;
