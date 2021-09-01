import React, { FC } from "react";

const Logo: FC<React.SVGProps<SVGPathElement>> = (props) => {
  return (
    <svg className="inline-block w-10 h-10" xmlns="http://www.w3.org/2000/svg">
      <path
        id="tinder"
        d="M11.89247,12.697c4.621-1.467,5.35446-5.7212,4.76767-9.53533,0,0,0-.22005.1467-.1467,4.47427,2.20046,9.462,6.82143,9.462,13.93626A10.06534,10.06534,0,0,1,16,27C9.39862,27,5.73117,22.379,5.73117,16.87788a9.90007,9.90007,0,0,1,4.76768-8.06836s.22,0,.22.1467a7.35489,7.35489,0,0,0,1.10023,3.66743Z"
        fill="#fff"
        {...props}
      />
    </svg>
  );
};

export default Logo;
