import { createColumnHelper } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DeleteAlertButton } from "@/components/ui/custom/DeleteDialog";

export default function getRequestColumns({
  handleDetail,
  handleEdit,
  handleDelete,
}) {
  const columnHelper = createColumnHelper();

  //   Blood Request => name / phone / email / address / age / blood type / unit / status

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
      header: "Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("age", {
      header: "Age",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => <span className="text-blue-600">{info.getValue()}</span>,
    }),
    columnHelper.accessor("phone", {
      header: "Phone",
      cell: (info) => (
        <a href={`tel:${info.getValue()}`} className="text-blue-500 underline">
          {info.getValue()}
        </a>
      ),
    }),
    columnHelper.accessor("address", {
      header: "Address",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("bloodType", {
      header: "Blood Type",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("unit", {
      header: "Unit",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        const value = info.getValue();
        const color =
          value === "approved"
            ? "text-green-600"
            : value === "pending"
            ? "text-yellow-600"
            : "text-red-600";
        return <span className={`font-medium ${color}`}>{value}</span>;
      },
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
              <DeleteAlertButton
                itemId={id}
                onDelete={() => handleDelete(id)}
                // title={"Domo"}
                // description={"What's mate?"}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    }),
  ];
}
