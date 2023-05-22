import React, { useCallback, useMemo, useState } from "react";
import { useAllOptimalsData, useAllPointsData } from "../api/useRequest";
import { MarketStatus } from "../enum";
import { AnalyticsPageContext } from "./AnalyticsPageContext";
import { MarketTable } from "./MarketTable";

type Props = {};

export const AnalyticsPage: React.FC<Props> = () => {
  const { data: pointsData } = useAllPointsData();
  const { data: optimalsData } = useAllOptimalsData();
  const [manualStatuses, setManualStatuses] = useState<
    Record<string, MarketStatus>
  >({});

  const handleManualStatus = useCallback(
    (market: MarketData, manualStatus: MarketStatus) =>
      setManualStatuses((statuses) => ({
        ...statuses,
        [`${market.statTypeId}-${market.playerId}-${market.line}`]:
          manualStatus,
      })),
    []
  );
  const marketData = useMemo<MarketData[]>(() => {
    if (!optimalsData || !pointsData) {
      return [];
    }
    return optimalsData.map<MarketData>((row) => {
      const points = pointsData
        .filter(
          (p) => p.statTypeId === row.statTypeId && p.playerId === row.playerId
        )
        .sort((a, b) => a.line - b.line);
      const optimalPoint = points.find((p) => p.line === row.line);
      const marketIdentifier = `${row.statTypeId}-${row.playerId}-${row.line}`;
      return {
        ...row,
        marketSuspended:
          typeof manualStatuses[marketIdentifier] !== "undefined"
            ? manualStatuses[marketIdentifier]
            : row.marketSuspended === MarketStatus.MARKET_SUSPENDED ||
              !optimalPoint ||
              (optimalPoint.pushOdds <= 0.4 &&
                optimalPoint.underOdds <= 0.4 &&
                optimalPoint.overOdds <= 0.4)
            ? MarketStatus.MARKET_SUSPENDED
            : MarketStatus.MARKET_LIVE,
        lowLine: points.at(0)?.line || row.line,
        highLine: points.at(points.length - 1)?.line || row.line,
      };
    });
  }, [optimalsData, pointsData, manualStatuses]);
  if (!optimalsData || !pointsData) {
    return <div className="container">loading</div>;
  }
  return (
    <AnalyticsPageContext.Provider value={{ handleManualStatus }}>
      <div className="container">
        <MarketTable marketData={marketData} />
      </div>
    </AnalyticsPageContext.Provider>
  );
};
