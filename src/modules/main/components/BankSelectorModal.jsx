import { useState, useEffect } from "react";
import { MainDataTable } from "@/components/ui/custom/main-data-table";
import getBankSelectorCol from "./BankSelectorColumn";
import { getBanks } from "@/api/main";

function BankSelectorModal({ isOpen, onClose, onSelect }) {
  const [banks, setBanks] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const columns = getBankSelectorCol({ onSelect });

  useEffect(() => {
    if (!isOpen) return;

    const fetchBanks = async () => {
      try {
        const res = await getBanks();
        const data = res?.data.banks;
        setBanks(data || []);
        setPage(1); // Reset to first page when banks change
      } catch (err) {
        console.error("Failed to load banks", err);
      }
    };

    fetchBanks();
  }, [isOpen]);

  // Client-side pagination
  const totalPages = Math.ceil(banks.length / pageSize);
  const paginatedBanks = banks.slice((page - 1) * pageSize, page * pageSize);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl text-black font-bold mb-4">Select a Bank</h2>

        <div className="overflow-x-auto">
          {banks.length > 0 ? (
            <MainDataTable
              columns={columns}
              data={paginatedBanks}
              page={page}
              pageSize={pageSize}
              totalPages={totalPages}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          ) : (
            <span className="text-black">Loading...</span>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 bg-gray-200 text-black cursor-pointer px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default BankSelectorModal;
