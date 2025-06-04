import { useState } from "react";
import AppointmentForm from "../components/AppointmentForm";
import { createAppointment } from "@/api/bank-dashboard/appointments";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function AppointmentCreate() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const storedData = localStorage.getItem("bank_data");
  const bankData = storedData ? JSON.parse(storedData) : null;

  if (!bankData) {
    // redirect to login or show error
    navigate("/bank-dashboard/login");
    return null;
  }

  const handleCreate = async (data) => {
    setLoading(true);
    const formattedData = {
      donor: data.donor._id,
      bloodRequest: data.bloodRequest._id,
      date: data.date,
      bank: bankData._id,
    };
    // console.log(data);
    // console.log(formattedData);

    try {
      const res = await createAppointment(formattedData);
      toast.success(res.message);
      // console.log(res);
      navigate(-1);
    } catch (err) {
      console.error("Create Appointment Failed: ", err);
      toast.error(
        err.response
          ? err.response.data.error +
              " - " +
              err.response.data.details.join(". ") ||
              "Appointment created Failed!"
          : err.message
      );
    }
  };

  return (
    <div>
      <AppointmentForm onSubmit={handleCreate} loading={loading} />
    </div>
  );
}
