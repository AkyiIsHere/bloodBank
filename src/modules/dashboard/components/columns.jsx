import { createColumnHelper } from "@tanstack/react-table";
import { DeleteAlertButton } from "@/components/ui/custom/DeleteDialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export default function getBankColumns({
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
    columnHelper.accessor("title", {
      header: "Bank Title",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => <span className="text-blue-600">{info.getValue()}</span>,
    }),
    // columnHelper.accessor("password", {
    //   header: "Password",
    //   cell: () => "••••••••", // never show actual password
    // }),
    columnHelper.accessor("description", {
      header: "Description",
      cell: (info) => (
        <span
          className="line-clamp-2 max-w-[300px] cursor-pointer"
          title={info.getValue()}
        >
          {info?.getValue() || "-"}
        </span>
      ),
    }),
    columnHelper.accessor("address", {
      header: "Address",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("city", {
      header: "City",
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
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        const value = info.getValue();
        const color =
          value === "active"
            ? "text-green-600"
            : value === "suspend"
            ? "text-red-600"
            : null;
        return <span className={`font-medium ${color}`}>{value}</span>;
      },
    }),
    columnHelper.accessor("createdAt", {
      header: "Created",
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
                className="custom-dropdownitem text-blue-500 hover:text-white hover:bg-blue-500"
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
