import React, { memo, useContext, useMemo } from "react";
import { useDrag } from "react-dnd";
import { BoxesContext } from "../providers/boxes.provider";
import { apps } from "../types/apps";
import { Box } from "../types/box";
import Browser from "./Apps/Browser.app";
import Gallery from "./Apps/Gallery.app";
import Reader from "./Apps/Reader.app";
interface IWindowProps extends Box {
  children: React.ReactNode;
}
const getStyles = ({ left, top, index, isDragging }: any) => {
  const transform = `translate3d(${left}px, ${top}px, 0)`;
  return {
    transform,
    WebkitTransform: transform,
    zIndex: index,
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : "",
  };
};
const AppBox: React.FC<IWindowProps> = memo(
  ({ id, left, app, top, index, children }) => {
    const { closeBox } = useContext(BoxesContext);
    const [{ isDragging }, drag] = useDrag(
      () => ({
        type: "window",
        item: { id, left, top },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      }),
      [id, left, top]
    );
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

    return (
      <div
        ref={drag}
        style={getStyles({ left, top, isDragging, index })}
        className="absolute flex flex-col justify-between overflow-hidden rounded-lg resize w-80 h-80 frost"
        // eslint-disable-next-line jsx-a11y/aria-role
        role="DraggableBox"
      >
        <div className="flex justify-end w-full p-1 bg-gray-500">
          <div className="w-3 h-3 mx-1 bg-green-400 rounded-full hover:bg-green-600"></div>
          <div className="w-3 h-3 mx-1 bg-yellow-400 rounded-full hover:bg-yellow-600"></div>
          <div
            onClick={() => closeBox(id)}
            className="w-3 h-3 mx-1 bg-red-400 rounded-full hover:bg-red-600"
          ></div>
        </div>
        <div className="flex-auto overflow-y-scroll">{appLoader}</div>
      </div>
    );
  }
);
export default AppBox;
