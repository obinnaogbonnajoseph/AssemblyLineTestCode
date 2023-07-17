import { useEffect, useRef, useState } from "react";
import AssemblyItem from "./AssemblyItem";
import "./styles.css";

export default function AssemblyLine({ stages }) {
  const [stageItems, setStageItems] = useState([]);

  const inputRef = useRef(null);

  const clearInput = () => {
    inputRef.current.value = "";
  };

  const addNewItem = (newVal) => {
    stageItems[0].items = [newVal, ...stageItems[0].items];
    setStageItems([...stageItems]);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value) {
      const newVal = e.target.value;
      addNewItem(newVal);
      clearInput();
    }
  };

  const moveForward = ({ stage: curStage, item }) => {
    const curStageIndex = stageItems.findIndex(
      ({ stage }) => stage === curStage
    );
    const curStageItem = stageItems[curStageIndex];
    curStageItem.items = curStageItem.items.filter((it) => it !== item);
    let nextStageItem = stageItems[curStageIndex + 1];
    if (curStageIndex < stageItems.length - 1) {
      nextStageItem.items = [item, ...nextStageItem.items];
    }
    setStageItems((prev) =>
      prev.map((stageItem) => {
        if (stageItem.stage === curStageItem.stage) {
          return curStageItem;
        }
        if (nextStageItem && nextStageItem.stage === stageItem.stage) {
          return nextStageItem;
        }
        return stageItem;
      })
    );
  };

  const moveBackward = ({ stage: curStage, item }) => {
    const curStageIndex = stageItems.findIndex(
      ({ stage }) => stage === curStage
    );
    const curStageItem = stageItems[curStageIndex];
    curStageItem.items = curStageItem.items.filter((it) => it !== item);
    let prevStageItem = stageItems[curStageIndex - 1];
    if (curStageIndex > 0) {
      prevStageItem.items = [...prevStageItem.items, item];
    }
    setStageItems((prev) =>
      prev.map((stageItem) => {
        if (stageItem.stage === curStageItem.stage) {
          return curStageItem;
        }
        if (prevStageItem && prevStageItem.stage === stageItem.stage) {
          return prevStageItem;
        }
        return stageItem;
      })
    );
  };

  useEffect(() => {
    setStageItems(stages.map((stage) => ({ stage, items: [] })));
  }, [stages]);

  return (
    <>
      <label htmlFor="add-item">Add item </label>
      <input id="add-item" ref={inputRef} onKeyDown={onKeyDown} />
      {stageItems &&
        stageItems.map((stageItem) => (
          <AssemblyItem
            key={stageItem.stage}
            stageItem={stageItem}
            moveForward={moveForward}
            moveBackward={moveBackward}
          />
        ))}
    </>
  );
}
