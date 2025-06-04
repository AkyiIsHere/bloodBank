import { useState, useEffect } from "react";
import getAppointmentCol from "../components/AppointmentColumns";
import { DataTable } from "@/components/ui/custom/data-table";
import { useNavigate } from "react-router";
import {
  getAppointments,
  deleteAppointmentByID,
} from "@/api/bank-dashboard/appointments";
import { toast } from "sonner";

export default function Appointment() {
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAppointments(page, pageSize);
        const data = res?.data.appointments;
        const total = res?.data.pagination.totalResult;

        if (!data) {
          console.warn("Appointments data are missing or undefined");
          return;
        }

        setData(data);
        setTotalPages(Math.ceil(total / pageSize));
        console.log(res.message);
      } catch (err) {
        console.error("Failed to fetch appointment data: ", err);
        err.message ? toast.error(err.message) : null;
      }
    };

    fetchData();
  }, [page, pageSize]);

  function handleCreate() {
    navigate("/bank-dashboard/appointments/create");
  }

  function handleDetail(id) {
    navigate(`/bank-dashboard/appointments/detail/${id}`);
  }

  function handleEdit(id) {
    navigate(`/bank-dashboard/appointments/edit/${id}`);
  }

  async function handleDelete(id) {
    // console.log("Delete donor: ", id);
    try {
      const res = await deleteAppointmentByID(id);
      // console.log(res);

      const refreshed = await getAppointments(page, pageSize);
      setData(refreshed.data.appointments);
      setTotalPages(
        Math.ceil(refreshed.data.pagination.totalResult / pageSize)
      );

      toast.success(res?.message);
    } catch (err) {
      console.error("Failed to delete Donor: ", err);
      err.message ? toast.error(err.message) : null;
    }
  }

  const columns = getAppointmentCol({ handleDetail, handleEdit, handleDelete });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white dark:bg-zinc-900 shadow-md rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Appointments
          </h1>
        </div>

        <div className="overflow-x-auto">
          {data ? (
            <DataTable
              columns={columns}
              data={data}
              onCreate={handleCreate}
              resourceName="Appointment"
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
