import { getRequests } from "@/api/bank-dashboard/requests";
import { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/custom/data-table";
import getRequestSelectorCol from "./RequestSelectorColumns";

function RequestSelectModal({ isOpen, onClose, onSelect }) {
  const [requests, setRequests] = useState();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!isOpen) return;

    const fetchRequest = async () => {
      try {
        const res = await getRequests(page, pageSize);
        const data = res?.data.requests;
        const total = res?.data.pagination.totalResult;

        setRequests(data);
        setTotalPages(Math.ceil(total / pageSize));
      } catch (err) {
        console.error("Failed to load donors", err);
      }
    };

    fetchRequest();
  }, [isOpen, page, pageSize]);

  if (!isOpen) return null;

  const columns = getRequestSelectorCol({ onSelect });

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-2xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Select a Request</h2>

        <div className="overflow-x-auto">
          {requests ? (
            <DataTable
              columns={columns}
              data={requests}
              page={page}
              pageSize={pageSize}
              totalPages={totalPages}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          ) : (
            "Loading..."
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 bg-gray-200 dark:bg-zinc-800 cursor-pointer px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default RequestSelectModal;
