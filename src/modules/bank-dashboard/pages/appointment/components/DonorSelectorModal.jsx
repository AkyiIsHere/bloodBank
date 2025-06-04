import { getDonors } from "@/api/bank-dashboard/donors";
import { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/custom/data-table";
import getDonorSelectorCol from "./DonorSelectorColoumns";

function DonorSelectorModal({ isOpen, onClose, onSelect }) {
  const [donors, setDonors] = useState();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!isOpen) return;

    const fetchDonors = async () => {
      try {
        const res = await getDonors(page, pageSize);
        const data = res?.data.donors;
        const total = res?.data.pagination.totalResult;

        setDonors(data);
        setTotalPages(Math.ceil(total / pageSize));
      } catch (err) {
        console.error("Failed to load donors", err);
      }
    };

    fetchDonors();
  }, [isOpen, page, pageSize]);

  if (!isOpen) return null;

  const columns = getDonorSelectorCol({ onSelect });

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-2xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Select a Donor</h2>

        <div className="overflow-x-auto">
          {donors ? (
            <DataTable
              columns={columns}
              data={donors}
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

export default DonorSelectorModal;
