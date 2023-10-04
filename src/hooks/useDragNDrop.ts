import {useRef, useState} from 'react';

const useDragNDrop = <T>(list: T[], setList: (newList: T[]) => void) => {
    const source = useRef<number | null>(null);
    const target = useRef<number | null>(null);

    const [isDraggable, setIsDraggable] = useState(false);

    const startDrag = (idx: number) => {
        source.current = idx;
    };

    const enterTarget = (idx: number) => {
        target.current = idx;
    };

    const endDrag = () => {
        const sourceIdx = source.current;
        const targetIdx = target.current;

        if (sourceIdx !== null && targetIdx !== null) {
            const newList = [...list];
            const sourceValue = newList[sourceIdx];
            newList.splice(sourceIdx, 1);
            newList.splice(targetIdx, 0, sourceValue);
            source.current = null;
            target.current = null;
            setList(newList);
        }
    };

    const mouseDown = () => {
        setIsDraggable(true);
    };

    const mouseUp = () => {
        setIsDraggable(false);
    };

    return {isDraggable, startDrag, enterTarget, endDrag, mouseDown, mouseUp};
};

export default useDragNDrop;
