import { apps } from "./apps";

export interface Box {
  id: string;
  index?: number;
  app?: apps;
  top: number | string;
  left: number | string;
}

export interface BoxesContextState {
  boxList: Box[];
  openApp: (Box: Partial<Box>) => void;
  closeBox: (id: string) => void;
  moveBox: (box: Box) => void;
}
