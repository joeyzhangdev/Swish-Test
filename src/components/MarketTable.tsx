import React, { useCallback, useContext } from "react";
import {
  CellProps,
  Column,
  useFilters,
  useGlobalFilter,
  useTable,
} from "react-table";
import { MarketStatus } from "../enum";
import { AnalyticsPageContext } from "./AnalyticsPageContext";
import { GlobalFilter, SelectColumnFilter } from "./Filter";

type Props = {
  marketData: MarketData[];
};

const columns: Column<MarketData>[] = [
  {
    Header: "Player Id",
    accessor: "playerId",
    disableGlobalFilter: true,
  },
  {
    Header: "Player Name",
    accessor: "playerName",
  },
  {
    Header: "Team Id",
    accessor: "teamId",
    disableGlobalFilter: true,
  },
  {
    Header: "Team Nick Name",
    accessor: "teamNickname",
  },
  {
    Header: "Team Abbr",
    accessor: "teamAbbr",
    disableGlobalFilter: true,
  },
  {
    Header: "Stat Type",
    accessor: "statType",
    Filter: SelectColumnFilter,
    filter: "exactTextCase",
    disableGlobalFilter: true,
  },
  {
    Header: "Stat Type Id",
    accessor: "statTypeId",
    disableGlobalFilter: true,
  },
  {
    Header: "Position",
    accessor: "position",
    Filter: SelectColumnFilter,
    filter: "exactTextCase",
    disableGlobalFilter: true,
  },
  {
    Header: "Market Status",
    accessor: (row: MarketData) =>
      row.marketSuspended === MarketStatus.MARKET_SUSPENDED
        ? "Suspended"
        : "Live",
    Filter: SelectColumnFilter,
    filter: "exactTextCase",
    disableGlobalFilter: true,
  },
  {
    Header: "Line",
    accessor: "line",
    disableGlobalFilter: true,
  },
  {
    Header: "Low Line",
    accessor: "lowLine",
    disableGlobalFilter: true,
  },
  {
    Header: "High Line",
    accessor: "highLine",
    disableGlobalFilter: true,
  },
  {
    Header: "Action",
    accessor: "marketSuspended",
    disableGlobalFilter: true,
    Cell: ({ row, value }: CellProps<MarketData>) => (
      <ManaulAction
        market={row.original}
        currentStatus={value as MarketStatus}
      />
    ),
  },
];

export const MarketTable: React.FC<Props> = ({ marketData }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    state,
    visibleColumns,
    prepareRow,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: marketData,
      defaultColumn: {
        Filter: <></>,
      },
    },
    useFilters,
    useGlobalFilter
  );
  return (
    <table {...getTableProps()}>
      <thead>
        <tr>
          <th colSpan={visibleColumns.length} style={{ textAlign: "center" }}>
            <GlobalFilter
              //preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </th>
        </tr>
        {(() => {
          console.log("Hi", headerGroups[0].headers);
          return headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  <div>
                    {!column.disableFilters ? column.render("Filter") : null}
                  </div>
                </th>
              ))}
            </tr>
          ));
        })()}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

type ManaulActionProps = {
  currentStatus: MarketStatus;
  market: MarketData;
};

const ManaulAction: React.FC<ManaulActionProps> = ({
  currentStatus,
  market,
}) => {
  const { handleManualStatus } = useContext(AnalyticsPageContext);
  const handleClick = useCallback(() => {
    handleManualStatus?.(
      market,
      currentStatus === MarketStatus.MARKET_SUSPENDED
        ? MarketStatus.MARKET_LIVE
        : MarketStatus.MARKET_SUSPENDED
    );
  }, [currentStatus, market, handleManualStatus]);
  return (
    <div onClick={handleClick} className="action-button">
      {currentStatus === MarketStatus.MARKET_SUSPENDED ? "Release" : "Lock"}
    </div>
  );
};
