import React, { memo, useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
interface IWindowProps {
  children: React.ReactNode;
  id: number | string;
  top: number | string;
  left: number | string;
  key: number | string;
}
const AppWindow: React.FC<IWindowProps> = memo(
  ({ id, left, top, children }) => {
    const getStyles = (left: any, top: any, isDragging: any) => {
      const transform = `translate3d(${left}px, ${top}px, 0)`;
      return {
        transform,
        WebkitTransform: transform,
        // IE fallback: hide the real node using CSS when dragging
        // because IE will ignore our custom "empty image" drag preview.
        opacity: isDragging ? 0 : 1,
        height: isDragging ? 0 : "",
      };
    };
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
    // useEffect(() => {
    //   preview(getEmptyImage(), { captureDraggingState: true });
    // }, []);
    console.log(left, top);
    return (
      <div
        ref={drag}
        style={getStyles(left, top, isDragging)}
        className="absolute flex flex-col justify-between overflow-hidden rounded-lg resize w-80 h-80 frost"
        role="DraggableBox"
      >
        <div className="flex justify-end w-full h-3 bg-gray-500">
          <div className="w-3 h-3 bg-white"></div>
          <div className="w-3 h-3 bg-white"></div>
          <div className="w-3 h-3 bg-white"></div>
        </div>
        <div className="flex-auto"></div>
      </div>
    );
  }
);
export default AppWindow;
