import {
  UseExpandedOptions,
  UseExpandedRowProps,
  UseFiltersInstanceProps,
  UseFiltersOptions,
  UseGlobalFiltersOptions,
  UsePaginationInstanceProps,
  UsePaginationOptions,
  UseRowStateRowProps,
  UseSortByOptions,
} from "react-table";

declare module "react-table" {
  // take this file as-is, or comment out the sections that don't apply to your plugin configuration

  export interface TableOptions<D extends Record<string, unknown>>
    extends UseExpandedOptions<D>,
      UseFiltersOptions<D>,
      UseGlobalFiltersOptions<D>,
      UsePaginationOptions<D>,
      UseSortByOptions<D>,
      // note that having Record here allows you to add anything to the options, this matches the spirit of the
      // underlying js library, but might be cleaner if it's replaced by a more specific type that matches your
      // feature set, this is a safe default.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Record<string, any> {}

  export interface TableInstance<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseFiltersInstanceProps<D>,
      UsePaginationInstanceProps<D> {}

  export interface ColumnInterface<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseFiltersColumnOptions<D>,
      UseGlobalFiltersColumnOptions<D> {}

  export interface ColumnInstance<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseFiltersColumnProps<D>,
      UseSortByColumnProps<D> {}

  export interface Row<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseExpandedRowProps<D>,
      UseRowStateRowProps<D> {}
  export interface TableState<D extends object = {}>
    extends UseGlobalFiltersState<D> {
    hiddenColumns?: Array<IdType<D>> | undefined;
  }
}
