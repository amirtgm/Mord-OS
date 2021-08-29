import { useCallback, useContext, useState } from "react";
import { useDrop } from "react-dnd";
import { App } from "./Apps.constant";
import update from "update-immutable";
import AppWindow from "./AppWindow";
import { BoxesContext } from "../providers/boxes.provider";

const AppContainer: React.FC = () => {
  const { boxList, moveBox } = useContext(BoxesContext);
  const [, drop] = useDrop(
    () => ({
      accept: "window",
      drop(item: any, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        if (delta) {
          const left = Math.round(item.left + delta.x);
          const top = Math.round(item.top + delta.y);

          moveBox({ left, top, id: item.id });
        }
        return undefined;
      },
    }),
    [moveBox]
  );
  console.log(boxList);
  return (
    <div ref={drop} className="w-full h-full">
      {Object.keys(boxList).map((key) => (
        // TODO fix Boxes type
        <AppWindow key={key} id={key} {...(boxList as any)[key]} />
      ))}
    </div>
  );
};

export default AppContainer;
