import { AppNodeMissingInputs } from "@/types/app-node";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

type FlowValidationContextType = {
  invalidInputs: AppNodeMissingInputs[];
  setInvalidInputs: Dispatch<SetStateAction<AppNodeMissingInputs[]>>;
  clearErrors: () => void;
};

type Props = {
  children: React.ReactNode;
};

export const FlowValidationContext =
  createContext<FlowValidationContextType | null>(null);

export const FlowValidationContextProvider = ({ children }: Props) => {
  const [invalidInputs, setInvalidInputs] = useState<AppNodeMissingInputs[]>(
    []
  );

  const clearErrors = () => {
    setInvalidInputs([]);
  };

  return (
    <FlowValidationContext.Provider
      value={{
        invalidInputs,
        setInvalidInputs,
        clearErrors,
      }}
    >
      {children}
    </FlowValidationContext.Provider>
  );
};
