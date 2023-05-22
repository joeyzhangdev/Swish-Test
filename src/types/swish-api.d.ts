interface OptimalBettingLine {
  playerName: string;
  playerId: number;
  teamId: number;
  teamNickname: string;
  teamAbbr: string;
  statType: string;
  statTypeId: number;
  position: string;
  marketSuspended: import("../enum").MarketStatus;
  line: number;
}

interface MarketPoint {
  playerName: string;
  playerId: number;
  statType: string;
  statTypeId: number;
  line: number;
  underOdds: number;
  overOdds: number;
  pushOdds: number;
}

interface ApiError {
  error: string;
}

interface MarketData extends OptimalBettingLine {
  lowLine: number;
  highLine: number;
}
