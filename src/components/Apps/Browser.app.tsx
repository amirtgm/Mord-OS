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
      navigate(inputUrl);
    }
  };
  const navigate = (url: string) => {
    setLoading(true);
    setUrls((draft) => {
      const index = draft.findIndex((d) => d.active);
      if (index !== -1) {
        draft[index].active = false;
      }
      draft.push({
        url,
        active: true,
      });
    });
    setInputUrl(url);
  };
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

  const url = useMemo(() => {
    return urls.filter((url) => url.active)[0]?.url;
  }, [urls]);

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
      {url && (
        <iframe
          onLoad={() => setLoading(false)}
          title="browser"
          className="absolute left-0 w-full h-full"
          src={url}
          sandbox=""
        ></iframe>
      )}
      {!url && (
        <div className="grid w-3/5 grid-cols-3 gap-4 mx-auto mt-28 h-2/5 ">
          <div className="w-10 h-10 mx-auto">
            <svg
              onClick={() => navigate("https://linkedin.com")}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="linkedin"
                className="w-4 h-4 text-white"
                d="M26.22362,4H5.77133A1.75177,1.75177,0,0,0,3.99985,5.72983V26.26822A1.75294,1.75294,0,0,0,5.77133,28H26.22362a1.75631,1.75631,0,0,0,1.77653-1.73177V5.72983A1.75514,1.75514,0,0,0,26.22362,4ZM11.118,24.45115H7.55811V12.99771H11.118ZM9.33887,11.432a2.06388,2.06388,0,1,1,2.06281-2.06453A2.06444,2.06444,0,0,1,9.33887,11.432Zm15.112,13.01918h-3.5573V18.88134c0-1.32878-.02441-3.03719-1.84977-3.03719-1.85237,0-2.136,1.447-2.136,2.941v5.666H13.35058V12.99771h3.41471v1.56487h.04738a3.73973,3.73973,0,0,1,3.368-1.84993c3.60464,0,4.27018,2.37223,4.27018,5.456Z"
                fill="#262626"
              />
            </svg>
          </div>
          <div className="w-10 h-10 mx-auto">
            <svg
              onClick={() => navigate("https://instagram.com")}
              className="w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="instagram"
                className="w-4 h-4 text-white"
                d="M16,6.16216c3.20414,0,3.58366.01222,4.849.06995a6.64012,6.64012,0,0,1,2.22824.4132,3.97394,3.97394,0,0,1,2.27743,2.27743,6.64009,6.64009,0,0,1,.4132,2.22822c.05773,1.26538.06995,1.6449.06995,4.849s-.01222,3.58366-.06995,4.849a6.64012,6.64012,0,0,1-.4132,2.22824,3.97394,3.97394,0,0,1-2.27743,2.27743,6.64012,6.64012,0,0,1-2.22824.4132c-1.26518.05773-1.64466.06995-4.849.06995s-3.58384-.01222-4.849-.06995a6.64012,6.64012,0,0,1-2.22824-.4132,3.97394,3.97394,0,0,1-2.27743-2.27743,6.64009,6.64009,0,0,1-.4132-2.22822c-.05773-1.26538-.06995-1.6449-.06995-4.849s.01222-3.58366.06995-4.849a6.64012,6.64012,0,0,1,.4132-2.22824A3.97394,3.97394,0,0,1,8.92274,6.64531a6.64009,6.64009,0,0,1,2.22822-.4132c1.26538-.05773,1.6449-.06995,4.849-.06995M16,4c-3.259,0-3.66766.0138-4.94758.0722A8.80773,8.80773,0,0,0,8.13953,4.63,6.136,6.136,0,0,0,4.63,8.13953a8.80773,8.80773,0,0,0-.55779,2.91289C4.0138,12.33234,4,12.741,4,16s.0138,3.66766.0722,4.94758A8.80773,8.80773,0,0,0,4.63,23.86047,6.136,6.136,0,0,0,8.13953,27.37a8.80773,8.80773,0,0,0,2.91289.55779C12.33234,27.98621,12.741,28,16,28s3.66766-.01379,4.94758-.0722A8.80773,8.80773,0,0,0,23.86047,27.37,6.136,6.136,0,0,0,27.37,23.86047a8.80773,8.80773,0,0,0,.55779-2.91289C27.9862,19.66766,28,19.259,28,16s-.0138-3.66766-.0722-4.94758A8.80773,8.80773,0,0,0,27.37,8.13953,6.136,6.136,0,0,0,23.86047,4.63a8.80773,8.80773,0,0,0-2.91289-.55779C19.66766,4.0138,19.259,4,16,4Zm0,5.83784A6.16216,6.16216,0,1,0,22.16216,16,6.16216,6.16216,0,0,0,16,9.83784ZM16,20a4,4,0,1,1,4-4A4,4,0,0,1,16,20ZM22.40563,8.15437a1.44,1.44,0,1,0,1.44,1.44A1.44,1.44,0,0,0,22.40563,8.15437Z"
                fill="#262626"
              />
            </svg>
          </div>
          <div className="w-10 h-10 mx-auto">
            <svg
              onClick={() => navigate("https://twitter.com")}
              className="w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="twitter"
                className="w-4 h-4 text-white"
                d="M26.32865,10.20428c.01043.22891.01043.45778.01043.6867A15.18194,15.18194,0,0,1,2.99214,23.68808a10.26487,10.26487,0,0,0,1.26929.07283A10.70029,10.70029,0,0,0,10.8889,21.472a5.33486,5.33486,0,0,1-4.9836-3.70387,5.36636,5.36636,0,0,0,2.40336-.09364,5.34632,5.34632,0,0,1-4.2761-5.23331v-.07283a5.39627,5.39627,0,0,0,2.41374.6659A5.35659,5.35659,0,0,1,4.79205,5.90738,15.1498,15.1498,0,0,0,15.78924,11.484a5.89821,5.89821,0,0,1-.13524-1.21727,5.33642,5.33642,0,0,1,9.22847-3.65189,10.61188,10.61188,0,0,0,3.3918-1.2901A5.368,5.368,0,0,1,25.9229,8.27951a10.81127,10.81127,0,0,0,3.06924-.84274A10.868,10.868,0,0,1,26.32865,10.20428Z"
                fill="#262626"
              />
            </svg>
          </div>
          <div className="w-10 h-10 mx-auto">
            <svg
              onClick={() => navigate("https://youtube.com")}
              className="w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="youtube"
                className="w-4 h-4 text-white"
                d="M28.24034,9.81073A3.21021,3.21021,0,0,0,25.9816,7.53732C23.9892,7,16,7,16,7s-7.98921,0-9.9816.53732A3.21021,3.21021,0,0,0,3.75967,9.81073,33.67486,33.67486,0,0,0,3.2258,16a33.6751,33.6751,0,0,0,.53387,6.18928,3.21018,3.21018,0,0,0,2.25874,2.27339C8.0108,25,16,25,16,25s7.98919,0,9.98159-.53734a3.21018,3.21018,0,0,0,2.25874-2.27339A33.67633,33.67633,0,0,0,28.77419,16,33.6761,33.6761,0,0,0,28.24034,9.81073ZM13.3871,19.7987V12.2013l6.67742,3.79882Z"
                fill="#262626"
              />
            </svg>
          </div>
          <div className="w-10 h-10 mx-auto">
            <svg
              onClick={() => navigate("https://facebook.com")}
              className="w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="Facebook"
                className="w-4 h-4 text-white"
                d="M29,16.07912A13,13,0,1,0,13.96875,28.94694V19.84447H10.668V16.07912h3.30078v-2.8698c0-3.26466,1.94081-5.06795,4.91029-5.06795a19.95289,19.95289,0,0,1,2.91.25441v3.20563H20.14979a1.88079,1.88079,0,0,0-2.11854,2.03423v2.44348h3.60547l-.57637,3.76535h-3.0291v9.10247A13.02132,13.02132,0,0,0,29,16.07912"
                fill="#262626"
              />
            </svg>
          </div>
          <div className="w-10 h-10 mx-auto">
            <svg
              onClick={() => navigate("https://zoom.com")}
              className="w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="zoom"
                className="w-4 h-4 text-white"
                d="M20.10554,4H11.89446A7.89446,7.89446,0,0,0,4,11.89446v8.21108A7.89446,7.89446,0,0,0,11.89446,28h8.21108A7.89446,7.89446,0,0,0,28,20.10554V11.89446A7.89446,7.89446,0,0,0,20.10554,4Zm-.73777,15.08546A1.11957,1.11957,0,0,1,18.2482,20.205h-6.981a2.68441,2.68441,0,0,1-2.68441-2.68442V13.027a1.232,1.232,0,0,1,1.232-1.232h6.70857a2.84437,2.84437,0,0,1,2.84438,2.84438Zm4.14163.40563a.71395.71395,0,0,1-1.21817.50544l-1.88257-1.87807a1.65461,1.65461,0,0,1-.486-1.1714V15.213a1.65463,1.65463,0,0,1,.486-1.1714l1.88257-1.87806a.71394.71394,0,0,1,1.21817.50543Z"
                fill="#262626"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default Browser;
