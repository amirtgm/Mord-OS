import React, { FC } from "react";
import { useQuery } from "react-query";
import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: "qje0zQPWbuwxieNSDAY1qulJ5kr6Jq34PNSRLaBjGiQ",
});

const Gallery: FC = () => {
  const { isLoading, data } = useQuery<any>("Gallery", () =>
    unsplash.search
      .getPhotos({ query: "wanderlust", perPage: 30, page: 1 })
      .then((res) => {
        return res.response?.results;
      })
  );
  console.log(data);
  return (
    <div
      style={{ columns: " 6 200px" }}
      className="w-full h-full p-3 overflow-auto"
    >
      {data &&
        !isLoading &&
        data.map((im: any) => (
          <img
            key={im.id}
            className="mb-3 rounded-lg"
            src={im.urls.full}
            alt=""
          />
        ))}
    </div>
  );
};

export default Gallery;
