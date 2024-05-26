import React from "react";

const useSortableArray = <T,>(
  initalArray: T[],
  setInitalArray: React.Dispatch<React.SetStateAction<T[]>>
) => {
  const moveElementToTop = (index: number) => {
    let newArray = [...initalArray];
    const [removeEle] = initalArray.splice(index, 1);
    newArray = [
      ...initalArray.slice(0, index),
      ...initalArray.slice(index, initalArray.length),
    ];
    newArray.unshift(removeEle);
    setInitalArray(newArray) as T;
  };
  const appendElement = (element: T) => {
    const newArray = [...initalArray];
    newArray.push(element);
    setInitalArray(newArray) as T;
  };
  return [moveElementToTop, appendElement] as const;
};

export { useSortableArray };
