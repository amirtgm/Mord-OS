import { apps } from "./apps";

export interface Box {
  id: string;
  index?: number;
  app?: apps;
  top: number;
  left: number;
}

export interface BoxesContextState {
  boxList: Box[];
  openApp: (Box: Partial<Box>) => void;
  moveBox: (Box: Box) => void;
  closeBox: (id: string) => void;
  bringToTop: (id: string) => void;
}
