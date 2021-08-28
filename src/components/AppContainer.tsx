import { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import { App } from "./Apps.constant";
import update from "update-immutable";
import AppWindow from "./AppWindow";

const AppContainer: React.FC = () => {
  const [boxes, setBoxes] = useState({
    a: { top: 20, left: 80 },
    b: { top: 180, left: 20 },
  });
  const moveBox = useCallback(
    (id, left, top) => {
      console.log({ left, top });
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top },
          },
        })
      );
    },
    [boxes]
  );
  const [, drop] = useDrop(
    () => ({
      accept: "window",
      drop(item: any, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        if (delta) {
          const left = Math.round(item.left + delta.x);
          const top = Math.round(item.top + delta.y);

          moveBox(item.id, left, top);
        }
        return undefined;
      },
    }),
    [moveBox]
  );
  console.log(boxes);
  return (
    <div ref={drop} className="w-full h-full">
      {Object.keys(boxes).map((key) => (
        <AppWindow key={key} id={key} {...(boxes as any)[key]} />
      ))}
    </div>
  );
};

export default AppContainer;
