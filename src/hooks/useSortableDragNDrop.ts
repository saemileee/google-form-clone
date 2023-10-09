import {useRef, useState} from 'react';

const useSortableDragNDrop = <T>(list: T[]) => {
  const source = useRef<number | null>(null);
  const target = useRef<number | null>(null);

  const [isDraggable, setIsDraggable] = useState(false);

  const startDrag = (idx: number) => {
    source.current = idx;
  };

  const enterTarget = (idx: number) => {
    target.current = idx;
  };

  const setResortedList = (cb: (list: T[]) => void) => {
    const sourceIdx = source.current;
    const targetIdx = target.current;

    if (sourceIdx !== null && targetIdx !== null) {
      const newList = [...list];
      const sourceValue = newList[sourceIdx];
      newList.splice(sourceIdx, 1);
      newList.splice(targetIdx, 0, sourceValue);
      source.current = null;
      target.current = null;
      cb(newList);
      return;
    }
    cb(list);
  };

  const mouseDown = () => {
    setIsDraggable(true);
  };

  const mouseUp = () => {
    setIsDraggable(false);
  };

  return {isDraggable, startDrag, enterTarget, setResortedList, mouseDown, mouseUp};
};

export default useSortableDragNDrop;
