import { rest } from "msw";
import mockOptimals from "./data/props.json";
import mockPoints from "./data/alternates.json";

export const handlers = [
  rest.get<any, any, OptimalBettingLine[] | ApiError>(
    "/api/optimals",
    (req, res, context) => {
      return res(
        context.status(200),
        context.json(mockOptimals as OptimalBettingLine[])
      );
    }
  ),
  rest.get<any, any, MarketPoint[] | ApiError>(
    "/api/points",
    (req, res, context) => {
      return res(
        context.status(200),
        context.json(mockPoints as MarketPoint[])
      );
    }
  ),
];
