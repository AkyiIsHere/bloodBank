import { createColumnHelper } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

export default function getBankSelectorCol({ onSelect }) {
  const columnHelper = createColumnHelper();

  return [
    columnHelper.accessor("title", {
      header: "Name",
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("description", {
      header: "Description",
      cell: (info) => (
        <span
          className="line-clamp-2 max-w-[300px] cursor-pointer"
          title={info.getValue()}
        >
          {info.getValue()?.split(" ").slice(0, 3).join(" ") + "..." || "-"}
        </span>
      ),
    }),

    columnHelper.accessor("phone", {
      header: "Phone",
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("city", {
      header: "City",
      cell: (info) => info.getValue(),
    }),

    columnHelper.display({
      id: "select",
      header: "Action",
      cell: ({ row }) => {
        const donor = row.original;
        return (
          <Button
            type="button"
            className="text-white border-2 border-blue-500 hover:bg-blue-900"
            onClick={() => onSelect(donor)}
          >
            Select
          </Button>
        );
      },
    }),
  ];
}
