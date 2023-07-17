import { useEffect, useState } from "react";
import "./styles.css";

export default function AssemblyItem({ stageItem, moveForward, moveBackward }) {
  const [items, setItems] = useState(stageItem.items);
  const [stage, setStage] = useState(stageItem.stage);

  const handleLeftClick = (item) => {
    moveForward({ stage, item });
  };

  const handleRightClick = (item, e) => {
    e.preventDefault();
    moveBackward({ stage, item });
  };

  useEffect(() => {
    setItems(stageItem.items);
    setStage(stageItem.stage);
  }, [stageItem.items, stageItem.stage]);
  return (
    <>
      <h4>{stage}</h4>
      {items.map((item) => (
        <button
          onClick={() => handleLeftClick(item)}
          onContextMenu={(e) => handleRightClick(item, e)}
          key={item}
        >
          {item}
        </button>
      ))}
    </>
  );
}
