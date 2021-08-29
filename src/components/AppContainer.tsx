import { useContext } from "react";
import AppBox from "./AppBox";
import { BoxesContext } from "../providers/boxes.provider";

const AppContainer: React.FC = () => {
  const { boxList } = useContext(BoxesContext);
  return (
    <>
      {Object.keys(boxList).map((key) => (
        <AppBox key={key} id={key} {...(boxList as any)[key]} />
      ))}
    </>
  );
};

export default AppContainer;
