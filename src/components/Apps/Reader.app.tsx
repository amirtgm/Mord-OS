import React, { FC } from "react";
import { useQuery } from "react-query";

const Reader: FC = () => {
  const { isLoading, data } = useQuery<Comment[]>("Reader", () =>
    fetch("https://jsonplaceholder.typicode.com/comments").then((res) =>
      res.json()
    )
  );

  return (
    <div className="flex flex-col justify-around w-full p-4">
      {!isLoading &&
        data?.slice(5, 10)?.map((comment) => {
          return (
            <div
              className="w-full p-2 mb-4 bg-gray-200 rounded-lg"
              key={comment.postId + comment.name}
            >
              <div className="flex flex-row items-center justify-between mb-4">
                <span className="inline-block px-2 py-1 text-sm text-white bg-purple-500 rounded-lg">
                  {comment.name}
                </span>
                <span className="inline-block h-auto px-2 py-1 text-xs text-white bg-blue-400 rounded-lg">
                  {comment.email}
                </span>
              </div>
              <p>{comment.body}</p>
            </div>
          );
        })}
    </div>
  );
};
Reader.whyDidYouRender = true;
export default Reader;
