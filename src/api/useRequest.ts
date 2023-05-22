import { useQuery } from "react-query";
import { getAllOptimals, getAllPoints } from ".";

export const useAllPointsData = (): {
  data?: MarketPoint[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
} => {
  const { isLoading, data, isError, refetch } = useQuery<MarketPoint[], Error>({
    queryKey: ["AllPoints"],
    queryFn: getAllPoints,
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
};

export const useAllOptimalsData = (): {
  data?: OptimalBettingLine[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
} => {
  const { isLoading, data, isError, refetch } = useQuery<
    OptimalBettingLine[],
    Error
  >({
    queryKey: ["AllOptimals"],
    queryFn: getAllOptimals,
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
};
