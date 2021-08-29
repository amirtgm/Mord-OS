interface Box {
  id: string;
  index?: number;
  top: number | string;
  left: number | string;
}

interface BoxesContextState {
  boxList: Box[];
  openApp: (Box?: Box) => void;
  closeApp: (id: string) => void;
  moveBox: (box: Box) => void;
}
