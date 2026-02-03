import { createContext, useContext, useState, ReactNode } from "react";

export interface BatchData {
  batchCode: string;
  fermentationStarted: string;
  harvestDate: string;
  bestBefore: string;
  status: "fermenting" | "harvested" | "ready";
}

interface BatchContextType {
  batchData: BatchData;
  updateBatchData: (data: BatchData) => void;
}

const defaultBatchData: BatchData = {
  batchCode: "OBL-2026-001",
  fermentationStarted: "18 Jan 2026 | 10:00 PM",
  harvestDate: "21 Jan 2026 | 11:00 AM",
  bestBefore: "21 Feb 2026",
  status: "ready",
};

const BatchContext = createContext<BatchContextType | undefined>(undefined);

export const BatchProvider = ({ children }: { children: ReactNode }) => {
  const [batchData, setBatchData] = useState<BatchData>(() => {
    const saved = localStorage.getItem("tepache-batch-data");
    return saved ? JSON.parse(saved) : defaultBatchData;
  });

  const updateBatchData = (data: BatchData) => {
    setBatchData(data);
    localStorage.setItem("tepache-batch-data", JSON.stringify(data));
  };

  return (
    <BatchContext.Provider value={{ batchData, updateBatchData }}>
      {children}
    </BatchContext.Provider>
  );
};

export const useBatch = () => {
  const context = useContext(BatchContext);
  if (!context) {
    throw new Error("useBatch must be used within a BatchProvider");
  }
  return context;
};
