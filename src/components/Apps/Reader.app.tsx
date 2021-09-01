import React, { FC, memo } from "react";
import { Virtuoso } from "react-virtuoso";
import { useQuery } from "react-query";

const ReaderApp: FC = memo(() => {
  const { isLoading, data } = useQuery<Comment[]>("Reader", () =>
    fetch("https://jsonplaceholder.typicode.com/comments").then((res) =>
      res.json()
    )
  );

  return (
    <div className="w-full h-full p-4">
      {!isLoading && data && (
        <Virtuoso
          className="h-full"
          totalCount={data?.length}
          itemContent={(index: number) => {
            const comment = data[index];
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
          }}
        />
      )}
    </div>
  );
});

export default ReaderApp;
