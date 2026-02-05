import { createContext, useContext, useState, useEffect, ReactNode } from "react";

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
    try {
      const saved = localStorage.getItem("tepache-batch-data");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Validate that all required fields exist
        if (parsed.batchCode && parsed.fermentationStarted && parsed.harvestDate && parsed.bestBefore && parsed.status) {
          return parsed;
        }
      }
    } catch (error) {
      console.error("Error loading batch data from localStorage:", error);
    }
    return defaultBatchData;
  });

  // Sync to localStorage whenever batchData changes
  useEffect(() => {
    try {
      localStorage.setItem("tepache-batch-data", JSON.stringify(batchData));
    } catch (error) {
      console.error("Error saving batch data to localStorage:", error);
    }
  }, [batchData]);

  const updateBatchData = (data: BatchData) => {
    setBatchData(data);
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
