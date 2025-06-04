import { createColumnHelper } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DeleteAlertButton } from "@/components/ui/custom/DeleteDialog";

export default function getDonarsCol({
  handleDetail,
  handleEdit,
  handleDelete,
}) {
  const columnHelper = createColumnHelper();
  // Donar => name / phone / dob ( date of birth ) / gender / address / blood type / weight
  return [
    // columnHelper.accessor("_id", {
    //   header: "ID",
    //   cell: (info) => (
    //     <button
    //       onClick={() => navigator.clipboard.writeText(info.getValue())}
    //       className="cursor-pointer active:text-blue-400"
    //       title="click to copy"
    //     >
    //       {info.getValue().slice(0, 6)}...{info.getValue().slice(-4)}
    //     </button>
    //   ),
    // }),
    columnHelper.accessor("name", {
      header: "Donor Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("phone", {
      header: "Phone",
      cell: (info) => (
        <a href={`tel:${info.getValue()}`} className="text-blue-500 underline">
          {info.getValue()}
        </a>
      ),
    }),
    columnHelper.accessor("dob", {
      header: "Date of Birth",
      cell: (info) =>
        new Date(info.getValue()).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
    }),
    columnHelper.accessor("gender", {
      header: "Gender",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("address", {
      header: "Address",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("bloodType", {
      header: "Blood Type",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("weight", {
      header: "Weight",
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const id = row.original._id;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <button
                onClick={() => handleDetail(id)}
                className="custom-dropdownitem text-green-500 hover:text-white hover:bg-green-500"
              >
                Detail
              </button>
              <button
                onClick={() => handleEdit(id)}
                className="custom-dropdownitem text-blue-600 hover:text-white hover:bg-blue-600"
              >
                Edit
              </button>
              <DeleteAlertButton itemId={id} onDelete={handleDelete} />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    }),
  ];
}
