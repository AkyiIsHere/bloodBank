import { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

/**
 * Controlled delete dialog, customizable trigger elsewhere
 */
export function DeleteDialog({
  open,
  setOpen,
  itemId,
  onDelete,
  title,
  description,
}) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title || "Are you absolutely sure?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {description ||
              `This action cannot be undone. This will permanently delete the data with ID: ${itemId}.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => setOpen(false)}
            className="rounded-md px-4 py-2 bg-gray-100"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onDelete(itemId);
              setOpen(false);
            }}
            className="rounded-md px-4 py-2 bg-red-600 text-white hover:bg-red-700"
          >
            Yes, delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

/**
 * Default delete button with built-in alert dialog
 */
export function DeleteAlertButton({ itemId, onDelete, title, description }) {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button className="custom-dropdownitem text-red-600 hover:bg-red-500 hover:text-white">
          Delete
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title || "Are you absolutely sure?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {description ||
              `This action cannot be undone. This will permanently delete the data
            with ID: ${itemId}.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-md px-4 py-2 bg-gray-100">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="rounded-md px-4 py-2 bg-red-600 text-white hover:bg-red-700"
            onClick={() => {
              onDelete(itemId);
              setOpen(false);
            }}
          >
            Yes, delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
