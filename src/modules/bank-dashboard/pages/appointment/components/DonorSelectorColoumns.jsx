// Appointment => Donar Id / Blood Request Id / Date / Bank

import { createColumnHelper } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

export default function getDonorSelectorCol({ onSelect }) {
  const columnHelper = createColumnHelper();

  return [
    columnHelper.accessor("_id", {
      header: "ID",
      cell: (info) => (
        <button
          type="button"
          onClick={() => navigator.clipboard.writeText(info.getValue())}
          className="cursor-pointer active:text-blue-400"
          title="click to copy"
        >
          {info.getValue().slice(0, 6)}...{info.getValue().slice(-4)}
        </button>
      ),
    }),

    columnHelper.accessor("name", {
      header: "Donor",
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("bloodType", {
      header: "Blood Type",
      cell: (info) => info.getValue(),
    }),

    columnHelper.display({
      id: "select",
      header: "Select",
      cell: ({ row }) => {
        const donor = row.original;
        return (
          <Button
            type="button"
            variant="outline"
            className="text-blue-600 border-blue-500 hover:bg-blue-50"
            onClick={() => onSelect(donor)}
          >
            Select
          </Button>
        );
      },
    }),
  ];
}
