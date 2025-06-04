import { useState, useEffect } from "react";
import getRequestCol from "../components/RequestFormColumns";
import { DataTable } from "@/components/ui/custom/data-table";
import { useNavigate } from "react-router";
import {
  getRequests,
  getRequestWithoutPagination,
  deleteRequestByID,
} from "@/api/bank-dashboard/requests";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import CsvDownloader from "react-csv-downloader";

export default function Donor() {
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const getCsvData = async () => {
    const headers = [
      "Name",
      "Age",
      "Blood Type",
      "Unit",
      "Email",
      "Phone",
      "Address",
    ];

    try {
      const response = await getRequestWithoutPagination();
      const requestList = response?.data?.requests || [];

      if (requestList.length === 0) {
        toast.info("No request data found to download.");
        return [headers];
      }

      const csvRows = requestList.map((request) => ({
        Name: request.name || "",
        Age: request.age || "",
        "Blood Type": request.bloodType || "",
        Unit: request.unit || "",
        Email: request.email || "",
        Phone: request.phone || "",
        Address: request.address || "",
      }));

      if (csvRows.length >= 1) {
        toast.success("Request report download started."); // Toast for successful download start
      }
      return csvRows;
    } catch (err) {
      console.error("Failed to fetch data for CSV download:", err);
      toast.error("Failed to download request report.");

      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getRequests(page, pageSize);
        const data = res?.data.requests;
        const total = res?.data.pagination.totalResult;

        if (!data) {
          console.warn("Requests data are missing or undefined");
          return;
        }

        setData(data);
        setTotalPages(Math.ceil(total / pageSize));

        console.log(res.message);
      } catch (err) {
        console.error("Failed to fetch Requests: ", err);
        err.message ? toast.error(err.message) : null;
      }
    };

    fetchData();
  }, [page, pageSize]);

  function handleCreate() {
    console.log("Create Request");
    navigate("/bank-dashboard/request-forms/create");
  }

  function handleDetail(id) {
    console.log("Edit Request", id);
    navigate(`/bank-dashboard/request-forms/detail/${id}`);
  }

  function handleEdit(id) {
    console.log("Edit Request", id);
    navigate(`/bank-dashboard/request-forms/edit/${id}`);
  }

  async function handleDelete(id) {
    // console.log("Delete request: ", id);
    try {
      const res = await deleteRequestByID(id);
      // console.log(res);

      const refreshed = await getRequests(page, pageSize);
      setData(refreshed.data.requests);
      setTotalPages(
        Math.ceil(refreshed.data.pagination.totalResult / pageSize)
      );

      toast.success(res?.message);
    } catch (err) {
      console.error("Failed to delete Request: ", err);
      err.message ? toast.error(err.message) : null;
    }
  }

  const columns = getRequestCol({
    handleDetail,
    handleEdit,
    handleDelete,
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white dark:bg-zinc-900 shadow-md rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Requests
          </h1>
        </div>

        <div className="overflow-x-auto">
          <CsvDownloader
            filename={"request_report"}
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
              Download Request Report (CSV)
            </Button>
          </CsvDownloader>

          {data ? (
            <DataTable
              columns={columns}
              data={data}
              onCreate={handleCreate}
              resourceName="Request"
              page={page}
              pageSize={pageSize}
              totalPages={totalPages}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          ) : (
            "Loading"
          )}
        </div>
      </div>
    </div>
  );
}
