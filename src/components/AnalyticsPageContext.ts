import { createContext } from "react";
import { MarketStatus } from "../enum";

type AnalyticsPageContextData = {
  handleManualStatus?: (market: MarketData, manualStatus: MarketStatus) => void;
};

export const AnalyticsPageContext = createContext<AnalyticsPageContextData>({});
