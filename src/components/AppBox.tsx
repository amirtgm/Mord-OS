import React, { memo, useContext, useMemo } from "react";
import Draggable, { DraggableData } from "react-draggable";
import { BoxesContext } from "../providers/boxes.provider";
import { apps } from "../types/apps";
import { Box } from "../types/box";
import Browser from "./Apps/Browser.app";
import Gallery from "./Apps/Gallery.app";
import Reader from "./Apps/Reader.app";
interface IWindowProps extends Box {
  children: React.ReactNode;
}
const AppBox: React.FC<IWindowProps> = memo(({ id, left, app, top, index }) => {
  const dragRef = React.useRef(null);
  const { closeBox, bringToTop, moveBox } = useContext(BoxesContext);

  const appLoader = useMemo(() => {
    switch (app) {
      case apps.BROWSER:
        return <Browser />;
      case apps.GALLERY:
        return <Gallery />;
      case apps.READER:
        return <Reader />;

      default:
        break;
    }
  }, [app]);
  const handleMove = (e: any, data: DraggableData) => {
    console.log(e);
    const offset = e.target.getBoundingClientRect();
    console.log({ offset });
    moveBox({ id, left: offset.left, top: offset.top });
  };
  return (
    <Draggable
      nodeRef={dragRef}
      axis="both"
      handle=".handle"
      defaultPosition={{ x: left, y: top }}
      onStop={(e, data) => handleMove(e, data)}
      onStart={() => bringToTop(id)}
    >
      <div
        className="absolute"
        ref={dragRef}
        style={{ zIndex: index }}
        onClick={() => bringToTop(id)}
        // eslint-disable-next-line jsx-a11y/aria-role
        role="DraggableBox"
      >
        <div
          style={{ minHeight: "20vh", minWidth: "40vh" }}
          className="relative flex flex-col justify-between pt-5 overflow-auto rounded-lg resize frost"
        >
          <div className="fixed top-0 flex justify-end w-full p-1 bg-gray-500 rounded-t-lg handle">
            <div className="w-3 h-3 mx-1 bg-green-400 rounded-full hover:bg-green-600"></div>
            <div className="w-3 h-3 mx-1 bg-yellow-400 rounded-full hover:bg-yellow-600"></div>
            <div
              onClick={() => closeBox(id)}
              className="w-3 h-3 mx-1 bg-red-400 rounded-full hover:bg-red-600"
            ></div>
          </div>
          <div className="flex-auto">{appLoader}</div>
        </div>
      </div>
    </Draggable>
  );
});
export default AppBox;
