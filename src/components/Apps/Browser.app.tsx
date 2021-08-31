import React, { FC, useState, useMemo } from "react";
import useLocalState from "@amirtgm/use-local-state";

const Browser: FC = () => {
  const [inputUrl, setInputUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // this state handler will handle the browser history , and each of the object is one node
  // of the history so if the active becomes true we will pick that url later on.
  // Same-origin policy : Same-origin policy restricts how a document or script loaded from one origin can interact with a resource from another origin.
  // It is a critical security mechanism for isolating potentially malicious documents.
  // and becuase of this we cant manage the history of the iframe.
  // this way of history manipulation will only works with the links user wrote.

  // case : if user click on a link within a website we loose the history change
  //
  const [urls, setUrls] = useLocalState<
    Array<{ url: string; active: boolean }>
  >([], "browser_app_urls");

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      setLoading(true);
      setUrls((draft) => {
        const index = draft.findIndex((d) => d.active);
        if (index !== -1) {
          draft[index].active = false;
        }
        draft.push({
          url: inputUrl,
          active: true,
        });
      });
    }
  };
  const url = useMemo(() => {
    return urls.filter((url) => url.active)[0]?.url;
  }, [urls]);
  const historyMutations = (action: "back" | "forward") => {
    setLoading(true);
    setUrls((draft) => {
      const index = draft.findIndex((d) => d.active);
      if (index > 1) {
        draft[index].active = false;
        if (index > 0 && action === "back") {
          draft[index - 1].active = true;
        } else if (index < draft.length - 1 && action === "forward") {
          draft[index + 1].active = true;
        }
        setInputUrl(draft[index - 1].url);
      }
      draft.push({
        url: inputUrl,
        active: true,
      });
    });
  };

  return (
    <div className="relative w-full h-full iframe-wrapper">
      <div className="flex flex-row items-center w-full px-2 py-1 bg-gray-600">
        <svg
          onClick={() => historyMutations("back")}
          xmlns="http://www.w3.org/2000/svg"
          className="inline-block w-6 h-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 17l-5-5m0 0l5-5m-5 5h12"
          />
        </svg>
        <svg
          onCanPlay={() => historyMutations("forward")}
          xmlns="http://www.w3.org/2000/svg"
          className="inline-block w-6 h-6 ml-2 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
        <input
          className="inline-block w-2/5 py-1 pl-4 ml-4 text-white bg-gray-700 rounded-2xl"
          type="text"
          value={inputUrl}
          onKeyDown={onKeyDown}
          onChange={(e) => setInputUrl(e.target.value)}
        />
        {loading && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block w-6 h-6 ml-3 text-white animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        )}
      </div>
      {url && inputUrl && (
        <iframe
          onLoad={() => setLoading(false)}
          title="browser"
          className="absolute left-0 w-full h-full"
          src={url}
          sandbox=""
        ></iframe>
      )}
      <div className="grid w-3/5 grid-cols-3 gap-4 mx-auto h-2/5 ">
        <div className="w-10 h-10 bg-gray-400">hi</div>
        <div className="w-10 h-10 bg-gray-400">hi</div>
        <div className="w-10 h-10 bg-gray-400">hi</div>
        <div className="w-10 h-10 bg-gray-400">hi</div>
        <div className="w-10 h-10 bg-gray-400">hi</div>
        <div className="w-10 h-10 bg-gray-400">hi</div>
      </div>
    </div>
  );
};

export default Browser;
