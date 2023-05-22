import { useMemo, useState } from "react";
import { FilterProps, FilterValue, useAsyncDebounce } from "react-table";

type GlobalFilterProps = {
  globalFilter: FilterValue;
  setGlobalFilter: (filterValue: FilterValue) => void;
};

// Component for Global Filter
export const GlobalFilter: React.FC<GlobalFilterProps> = ({
  globalFilter,
  setGlobalFilter,
}) => {
  const [value, setValue] = useState(globalFilter);

  const onChange = useAsyncDebounce((value) => {
    console.log("eeee", value);
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div>
      <label>Search Table: </label>
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder=" Enter value "
        style={{
          fontSize: "1.1rem",
          margin: "15px",
          display: "inline",
        }}
      />
    </div>
  );
};

// Component for Custom Select Filter
export const SelectColumnFilter: React.FC<FilterProps<MarketData>> = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}) => {
  // Use preFilteredRows to calculate the options
  const options = useMemo(() => {
    const options = new Set<string>();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return Array.from(options);
  }, [id, preFilteredRows]);

  // UI for Multi-Select box
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
