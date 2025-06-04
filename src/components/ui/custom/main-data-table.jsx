import React from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, Plus } from "lucide-react";

export function MainDataTable({
  columns,
  data,
  onCreate,
  resourceName = null,
  page,
  pageSize,
  totalPages,
  onPageChange,
  onPageSizeChange,
}) {
  const isPaginated =
    page && pageSize && totalPages && onPageChange && onPageSizeChange;

  const [sorting, setSorting] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const rowHeight = 48;

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination: isPaginated ? { pageIndex: page - 1, pageSize } : undefined,
      sorting,
      globalFilter,
    },
    manualPagination: isPaginated,
    pageCount: isPaginated ? totalPages : undefined,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4">
      {/* Search + Rows per page */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Input
          placeholder="Search..."
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm border-black"
        />

        {isPaginated && (
          <div className="flex items-center gap-2">
            <label htmlFor="pageSize" className="text-sm text-gray-600">
              Rows per page:
            </label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={(e) => {
                onPageSizeChange(Number(e.target.value));
                onPageChange(1);
              }}
              className="border bg-white text-black border-gray-300 rounded px-2 py-1 text-sm"
            >
              {[5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}

        {onCreate && (
          <Button
            onClick={onCreate}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create {resourceName}
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="rounded-md border border-gray-300 text-black bg-white">
        <Table className="">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-gray-200 text-black"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="bg-gray-100 text-black border-b border-gray-300"
                  >
                    {header.column.getCanSort() ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={header.column.getToggleSortingHandler()}
                              className="flex items-center space-x-1"
                            >
                              <span>
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                              </span>
                              {header.column.getIsSorted() ? (
                                <ArrowUpDown
                                  className="ml-2 h-4 w-4"
                                  style={{
                                    transform:
                                      header.column.getIsSorted() === "desc"
                                        ? "rotate(180deg)"
                                        : "rotate(0deg)",
                                  }}
                                />
                              ) : null}
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Click to sort</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              <>
                {table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="border-b border-gray-200 text-black"
                    style={{
                      height: `${rowHeight}px`,
                      maxHeight: `${rowHeight}px`,
                      minHeight: `${rowHeight}px`,
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}

                {/* Placeholder empty rows to maintain height */}
                {page > 1 && table.getRowModel().rows.length < pageSize
                  ? [
                      ...Array(
                        Math.max(0, pageSize - table.getRowModel().rows.length)
                      ),
                    ].map((_, i) => (
                      <TableRow
                        key={`empty-${i}`}
                        aria-hidden="true"
                        style={{
                          height: `${rowHeight}px`,
                          maxHeight: `${rowHeight}px`,
                          minHeight: `${rowHeight}px`,
                          pointerEvents: "none",
                          opacity: 0,
                          border: "none",
                        }}
                      >
                        <TableCell colSpan={columns.length} />
                      </TableRow>
                    ))
                  : null}
              </>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination controls */}
      {isPaginated && (
        <div className="flex items-center justify-between space-x-2 px-4 py-2 rounded-md bg-white text-black">
          <div className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              type="button"
              size="sm"
              onClick={() => onPageChange(Math.max(page - 1, 1))}
              disabled={page <= 1}
              className="border border-gray-300 bg-white text-black hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => onPageChange(Math.min(page + 1, totalPages))}
              disabled={page >= totalPages}
              className="border border-gray-300 bg-white text-black hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
