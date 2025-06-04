import { useEffect, useState } from "react";
import getBankColumns from "../components/columns";
import { DataTable } from "@/components/ui/custom/data-table";
import { useNavigate } from "react-router";
import {
  getBanks,
  deleteBankByID,
  getBanksWithoutPagination,
} from "@/api/dashboard/banks";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import CsvDownloader from "react-csv-downloader";

export default function Bank() {
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  // git update

  const getCsvData = async () => {
    const headers = ["Title", "Email", "Phone", "City", "Address"];

    try {
      const response = await getBanksWithoutPagination();
      const bankList = response?.data?.banks || [];

      if (bankList.length === 0) {
        toast.info("No bank data found to download.");
        return [headers];
      }

      const csvRows = bankList.map((bank) => ({
        Title: bank.title || "",
        Email: bank.email || "",
        Phone: bank.phone || "",
        City: bank.city || "",
        Address: bank.address || "",
      }));

      if (csvRows.length > 1) {
        toast.success("Bank report download started."); // Toast for successful download start
      }
      return csvRows;
    } catch (err) {
      console.error("Failed to fetch data for CSV download:", err);
      toast.error("Failed to download bank report.");

      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBanks(page, pageSize);
        const data = res?.data.banks;
        const total = res?.data.pagination.totalResult;

        if (!data) {
          console.warn("Bank datas are missing or undefined");
          return;
        }
        console.log({ data });

        setData(data);
        setTotalPages(Math.ceil(total / pageSize));

        console.log(res?.message);
      } catch (err) {
        console.error("Failed to fetch banks lists:", err);
        err.message ? toast.error(err.message) : null;
      }
    };

    fetchData();
  }, [page, pageSize]);

  function handleCreate() {
    console.log("Create bank");
    navigate("/dashboard/banks/create");
  }

  function handleDetail(id) {
    navigate(`/dashboard/banks/detail/${id}`);
  }

  function handleEdit(id) {
    navigate(`/dashboard/banks/edit/${id}`);
  }

  async function handleDelete(id) {
    // console.log("Delete donor: ", id);
    try {
      const res = await deleteBankByID(id);
      // console.log(res);

      const refreshed = await getBanks(page, pageSize);
      setData(refreshed.data.banks);
      setTotalPages(
        Math.ceil(refreshed.data.pagination.totalResult / pageSize)
      );

      toast.success(res?.message);
    } catch (err) {
      console.error("Failed to delete Bank: ", err);
      err.message ? toast.error(err.message) : null;
    }
  }

  const columns = getBankColumns({ handleDetail, handleEdit, handleDelete });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white dark:bg-zinc-900 shadow-md rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Bank Management
          </h1>
        </div>

        <div className="overflow-x-auto">
          <CsvDownloader
            filename={"bank_report"}
            extension=".csv"
            datas={getCsvData}
          >
            {/* <button className="btn btn-primary mb-4">
              Download Bank Report (CSV)
            </button> */}
            <Button
              type="button"
              className="bg-blue-600 text-white hover:bg-blue-700 mb-4"
            >
              Download Bank Report (CSV)
            </Button>
          </CsvDownloader>

          {data ? (
            <DataTable
              columns={columns}
              data={data}
              onCreate={handleCreate}
              resourceName="Bank"
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
      </div>
    </div>
  );
}
