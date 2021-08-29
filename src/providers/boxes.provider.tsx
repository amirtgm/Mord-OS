import React, { createContext, FC } from "react";
import { v4 as uuid } from "uuid";
import useLocalState from "@amirtgm/use-local-state";

const contextDefaultValues: BoxesContextState = {
  boxList: [
    {
      top: 20,
      left: 200,
      id: "hi",
    },
    {
      top: 100,
      left: 2,
      id: "h2",
    },
  ],
  openApp: () => {},
  closeApp: () => {},
  moveBox: () => {},
};
interface BoxesProviderProps {
  children: React.ReactNode;
}
export const BoxesContext =
  createContext<BoxesContextState>(contextDefaultValues);

const BoxesProvider: FC<BoxesProviderProps> = ({
  children,
}: BoxesProviderProps) => {
  // useStickyState is a wrapper around use-immer for making the state offline-ready.
  // there is no document for it yet but it's actually nothing more than this :D
  const [zIndex, setZIndex] = useLocalState<number>(1, "boxIndex");
  const [boxList, setBoxList] = useLocalState<Box[]>(
    contextDefaultValues.boxList,
    "boxList"
  );

  const openApp = (box?: Box) => {
    setBoxList((draft: Box[]) => {
      setZIndex(zIndex + 1);
      draft.push({
        top: window.innerHeight / 2 - zIndex * 10,
        left: window.innerWidth / 2 - zIndex * 10,
        ...box,
        index: zIndex,
        id: uuid(),
      });
    });
  };

  const closeApp = (id: string) => {
    setBoxList((draft: Box[]) => {
      const boxIndex = draft.findIndex((t) => t.id === id);
      draft.splice(boxIndex, 1);
    });
  };
  const moveBox = (box: Box) => {
    setBoxList((draft: Box[]) => {
      const boxIndex = draft.findIndex((t) => t.id === box.id);
      draft[boxIndex].top = box.top;
      draft[boxIndex].left = box.left;
      draft[boxIndex].index = zIndex + 1;
    });
    setZIndex(zIndex + 1);
  };
  return (
    <BoxesContext.Provider
      value={{
        boxList,
        openApp,
        closeApp,
        moveBox,
      }}
    >
      {children}
    </BoxesContext.Provider>
  );
};

export default BoxesProvider;
