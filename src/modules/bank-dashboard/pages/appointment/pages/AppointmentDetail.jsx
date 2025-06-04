import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  getAppointmentByID,
  deleteAppointmentByID,
} from "@/api/bank-dashboard/appointments";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/custom/FormElements";
import { toast } from "sonner";
import InfoRow from "@/components/ui/custom/InfoRow";
import { DeleteDialog } from "@/components/ui/custom/DeleteDialog";

export default function AppointmentDetail() {
  const [data, setData] = useState(null);
  const [delDialogOpen, setDelDialogOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  // console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAppointmentByID(id);
        const data = res?.data.request;

        if (!data) {
          console.warn("Appointment data is missing or undefined");
          return;
        }

        setData(data);
        console.log(res?.message);
      } catch (err) {
        console.error("Failed to fetch Appointment Data", err);
        err.message ? toast.error(err.message) : null;
      }
    };

    fetchData();
  }, [id]);

  const fields = data
    ? [
        { label: "ID", value: data._id },
        {
          label: "Donor",
          value: (
            <Button
              variant="outline"
              size="sm"
              title="click to see donor detail"
              onClick={() =>
                navigate(`/bank-dashboard/donors/detail/${data.donor._id}`)
              }
            >
              {data.donor.name}
            </Button>
          ),
        },
        {
          label: "Date",
          value: new Date(data.date).toLocaleString(),
        },
        {
          label: "Blood Request",
          value: (
            <Button
              variant="outline"
              size="sm"
              title="click to see request detail"
              onClick={() =>
                navigate(
                  `/bank-dashboard/request-forms/detail/${data.bloodRequest._id}`
                )
              }
            >
              {data.bloodRequest.name}
            </Button>
          ),
        },
        { label: "Bank", value: data.bank.title },
        {
          label: "Status",
          value: (
            <span
              className={`font-medium ${
                data.status === "scheduled"
                  ? "text-blue-600"
                  : data.status === "success"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {data.status}
            </span>
          ),
        },
        {
          label: "Created",
          value: new Date(data.createdAt).toLocaleString(),
        },
        {
          label: "Last Updated",
          value: new Date(data.updatedAt).toLocaleString(),
        },
      ]
    : [];

  const dataElements = fields.map((field, index) => (
    <InfoRow key={index} label={field.label} value={field.value} />
  ));

  function editAppointment() {
    navigate(`/bank-dashboard/appointments/edit/${id}`);
  }

  async function deleteAppointment(id) {
    try {
      const res = await deleteAppointmentByID(id);
      toast.success(res.message);
      navigate(-1);
    } catch (err) {
      console.error("Failed to delete Appointment: ", err);
      toast.error(
        err?.message || "Something went wrong while deleting the Appointment"
      );
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <BackButton />
      <Card className="rounded-2xl shadow-lg border border-gray-200">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
            Appointment Detail
          </h2>
          <div className="space-x-2">
            <Button variant="outline" onClick={editAppointment}>
              Edit
            </Button>
            <Button
              variant="destructive"
              onClick={() => setDelDialogOpen(true)}
            >
              Delete
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {data ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-800">
              {dataElements}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-10">
              Loading appointments details...
            </div>
          )}
        </CardContent>
      </Card>

      {/* Separate dialog component */}
      <DeleteDialog
        open={delDialogOpen}
        setOpen={setDelDialogOpen}
        itemId={id}
        onDelete={deleteAppointment}
      />
    </div>
  );
}
