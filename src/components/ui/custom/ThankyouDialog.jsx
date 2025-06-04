import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export function ThankYouDialog({ open, onClose }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm rounded-2xl bg-white text-black p-6 shadow-lg">
        <DialogHeader>
          <div className="flex justify-center mb-2">
            <CheckCircle2 className="text-green-500 w-12 h-12" />
          </div>
          <DialogTitle className="text-2xl font-semibold text-center">
            Thank You!
          </DialogTitle>
        </DialogHeader>

        <p className="text-gray-600 text-center mt-2">
          Your donor form has been successfully submitted.
          <br />
          We appreciate your contribution!
        </p>

        <DialogFooter className="mt-6">
          <Button
            onClick={onClose}
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
