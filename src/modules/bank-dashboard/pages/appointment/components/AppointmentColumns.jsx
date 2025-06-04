// Appointment => Donar Id / Blood Request Id / Date / Bank

import { createColumnHelper } from "@tanstack/react-table";
import { DeleteAlertButton } from "@/components/ui/custom/DeleteDialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export default function getAppointmentCol({
  handleDetail,
  handleEdit,
  handleDelete,
}) {
  const columnHelper = createColumnHelper();

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
    columnHelper.accessor("donor.name", {
      header: "Donor",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("bloodRequest.name", {
      header: "Blood Request",
      cell: (info) => info.getValue(),
    }),
    // columnHelper.accessor("bloodRequest._id", {
    //   header: "Blood Request ID",
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
    columnHelper.accessor("bank.title", {
      header: "Bank Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        const value = info.getValue();
        const color =
          value === "scheduled"
            ? "text-blue-600"
            : value === "completed"
            ? "text-green-600"
            : "text-red-600";
        return <span className={`font-medium ${color}`}>{value}</span>;
      },
    }),
    columnHelper.accessor("date", {
      header: "Date",
      cell: (info) =>
        new Date(info.getValue()).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
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
