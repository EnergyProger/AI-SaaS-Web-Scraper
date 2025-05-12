import { DEFAULT_WORKFLOW_SKELETON } from "@/constants/constants";
import { Skeleton } from "./ui/skeleton";

const UserWorkflowsSkeleton = () => {
  return (
    <div className="space-y-2">
      {DEFAULT_WORKFLOW_SKELETON.map((item) => (
        <Skeleton key={item} className="h-32 w-full" />
      ))}
    </div>
  );
};

export default UserWorkflowsSkeleton;
