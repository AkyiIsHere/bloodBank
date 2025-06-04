import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import AppointmentForm from "../components/AppointmentForm";
import {
  getAppointmentByID,
  updateAppointment,
} from "@/api/bank-dashboard/appointments";
import { toast } from "sonner";

export default function AppointmentEdit() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  // console.log(data);

  //cause datetime-locale expect this type of date format
  const formattedData = data
    ? {
        ...data,
        date: new Date(data.date).toISOString().slice(0, 16),
      }
    : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAppointmentByID(id);
        const data = res?.data.request;

        if (!data) {
          console.warn("Appointment data is missing or undefined!");
        }

        setData(data);
        console.log(res.message);
      } catch (err) {
        console.error("Failed to fetch Appointment data: ", err);
        err.message ? toast.error(err.message) : null;
      }
    };
    fetchData();
  }, [id]);

  async function handleUpdate(data) {
    setLoading(true);
    const requiredData = {
      donor: data.donor._id,
      bloodRequest: data.bloodRequest._id,
      date: data.date,
      bank: data.bank._id,
    };

    // console.log("update data", data);
    // console.log(requiredData);

    try {
      const res = await updateAppointment(id, requiredData);
      // console.log(res);
      toast.success(res?.message);
      navigate(-1);
    } catch (err) {
      console.error("Failed to update Appointment: ", err);
      toast.error(
        err.response
          ? err.response.data.error +
              " - " +
              err.response.data.details.join(". ") || "Donor Update Failed!"
          : err.message
      );
    } finally {
      setLoading(true);
    }
  }

  return (
    <div>
      {data ? (
        <AppointmentForm
          onSubmit={handleUpdate}
          defaultValues={formattedData}
          isEdit
          loading={loading}
        />
      ) : (
        "Loading..."
      )}
    </div>
  );
}
