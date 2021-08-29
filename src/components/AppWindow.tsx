import React, { memo, useContext, useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { BoxesContext } from "../providers/boxes.provider";
interface IWindowProps {
  children: React.ReactNode;
  id: string;
  top: number | string;
  left: number | string;
  index: number;
  key: number | string;
}
const getStyles = ({ left, top, index, isDragging }: any) => {
  const transform = `translate3d(${left}px, ${top}px, 0)`;
  return {
    transform,
    WebkitTransform: transform,
    zIndex: index,
    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : "",
  };
};

const AppWindow: React.FC<IWindowProps> = memo(
  ({ id, left, top, index, children }) => {
    const { closeApp } = useContext(BoxesContext);
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

    console.log(id, left, top);
    return (
      <div
        ref={drag}
        style={getStyles({ left, top, isDragging, index })}
        className="absolute flex flex-col justify-between overflow-hidden rounded-lg resize w-80 h-80 frost"
        role="DraggableBox"
      >
        <div className="flex justify-end w-full p-1 bg-gray-500">
          <div className="w-3 h-3 mx-1 bg-green-400 rounded-full hover:bg-green-600"></div>
          <div className="w-3 h-3 mx-1 bg-yellow-400 rounded-full hover:bg-yellow-600"></div>
          <div
            onClick={() => closeApp(id)}
            className="w-3 h-3 mx-1 bg-red-400 rounded-full hover:bg-red-600"
          ></div>
        </div>
        <div className="flex-auto"></div>
      </div>
    );
  }
);
export default AppWindow;
