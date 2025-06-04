// Donar => name / phone / dob ( date of birth ) / gender / address / blood_type / weight
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { DataTable } from "@/components/ui/custom/data-table";
import getDonarsCol from "../components/DonorColumns";
import {
  getDonors,
  getDonorsWithoutPagination,
  deleteDonorByID,
} from "@/api/bank-dashboard/donors";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import CsvDownloader from "react-csv-downloader";

// donorname, phone, DateOfBirth, Gender, Address, BloodType, Weight

export default function Donor() {
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const getCsvData = async () => {
    const headers = [
      "Donor Name",
      "Date of Birth",
      "Gender",
      "Blood Type",
      "Weight",
      "Phone",
      "Address",
    ];

    try {
      const response = await getDonorsWithoutPagination();
      const donorList = response?.data?.donors || [];

      if (donorList.length === 0) {
        toast.info("No donor data found to download.");
        return [headers];
      }

      const csvRows = donorList.map((donor) => ({
        "Donor Name": donor.name || "",
        "Date of Birth":
          new Date(donor.dob).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }) || "",
        Gender: donor.gender || "",
        "Blood Type": donor.bloodType || "",
        Weight: donor.weight || "",
        Phone: donor.phone || "",
        Address: donor.address || "",
      }));

      if (csvRows.length >= 1) {
        toast.success("Donor report download started."); // Toast for successful download start
      }
      return csvRows;
    } catch (err) {
      console.error("Failed to fetch data for CSV download:", err);
      toast.error("Failed to download donor report.");

      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDonors(page, pageSize);
        const data = res?.data.donors;
        const total = res?.data.pagination.totalResult;

        if (!data) {
          console.warn("Donor datas are missing or undefined");
          return;
        }

        setData(data);
        setTotalPages(Math.ceil(total / pageSize));

        console.log(res?.message);
      } catch (err) {
        console.error("Failed to fetch donors lists:", err);
        err.message ? toast.error(err.message) : null;
      }
    };
    fetchData();
  }, [page, pageSize]);

  function handleCreate() {
    console.log("Create donor");
    navigate("/bank-dashboard/donors/create");
  }

  function handleDetail(id) {
    console.log("Donor Detail", id);
    navigate(`/bank-dashboard/donors/detail/${id}`);
  }

  function handleEdit(id) {
    console.log("Edit donor", id);
    navigate(`/bank-dashboard/donors/edit/${id}`);
  }

  async function handleDelete(id) {
    // console.log("Delete donor: ", id);
    try {
      const res = await deleteDonorByID(id);
      // console.log(res);

      const refreshed = await getDonors(page, pageSize);
      setData(refreshed.data.donors);
      setTotalPages(
        Math.ceil(refreshed.data.pagination.totalResult / pageSize)
      );

      toast.success(res?.message);
    } catch (err) {
      console.error("Failed to delete Donor: ", err);
      err.message ? toast.error(err.message) : null;
    }
  }

  const columns = getDonarsCol({ handleDetail, handleEdit, handleDelete });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white dark:bg-zinc-900 shadow-md rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Donors
          </h1>
        </div>

        <div className="overflow-x-auto">
          <CsvDownloader
            filename={"donor_report"}
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
              Download Donor Report (CSV)
            </Button>
          </CsvDownloader>

          {data ? (
            <DataTable
              columns={columns}
              data={data}
              onCreate={handleCreate}
              resourceName="Donor"
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
