"use client";

import { cn } from "@/lib/utils";
import { useReactFlow } from "@xyflow/react";

type Props = {
  nodeId: string;
  children: React.ReactNode;
  isSelected: boolean;
};

const NodeCard = ({ nodeId, children, isSelected }: Props) => {
  const { getNode, setCenter } = useReactFlow();

  const onCenterNode = (nodeId: string) => {
    const node = getNode(nodeId);

    if (!node) return;

    const { position, measured } = node;

    if (!position || !measured) return;

    const { width, height } = measured;

    if (!width || !height) return;

    const x = position.x + width / 2;
    const y = position.y + height / 2;

    if (x === undefined || y === undefined) return;

    setCenter(x, y, { zoom: 1, duration: 500 });
  };
  return (
    <div
      onDoubleClick={() => onCenterNode(nodeId)}
      className={cn(
        `rounded-md cursor-pointer bg-background border-2 border-separate w-[400px]
    text-xs gap-1 flex flex-col`,
        isSelected && "border-primary"
      )}
    >
      {children}
    </div>
  );
};

export default NodeCard;
