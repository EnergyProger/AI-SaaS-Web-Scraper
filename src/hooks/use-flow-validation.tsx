import { FlowValidationContext } from "@/context/flow-validation-context";
import { useContext } from "react";

export const useFlowValidation = () => {
  const context = useContext(FlowValidationContext);

  if (!context) {
    throw new Error(
      "useFlowValidation must be used within a FlowValidationContext"
    );
  }

  return context;
};
