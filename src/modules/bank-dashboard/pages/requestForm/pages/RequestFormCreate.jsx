import { useState } from "react";
import RequestForm from "../components/RequestFormFormat";
import { createRequest } from "@/api/bank-dashboard/requests";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export default function DonorsCreate() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    const formattedData = {
      ...data,
      age: +data.age,
      unit: +data.unit,
      bloodType: data.bloodType.toUpperCase(),
    };
    // console.log(data);
    setLoading(true);

    try {
      const res = await createRequest(formattedData);
      toast.success(res.message);
      console.log(res);
      navigate(-1);
    } catch (err) {
      console.error("Failed to create Request: ", err);
      toast.error(
        err.response
          ? err.response.data.error +
              " - " +
              err.response.data.details.join(". ") || "Bank created Failed!"
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <RequestForm onSubmit={handleCreate} loading={loading} />
    </div>
  );
}

// {
//   "name": "Aung Aung",
//   "phone": "09868734567",
//   "email": "aungaung.request@example.com",
//   "address": "No. 123, Main Street, Yangon",
//   "bloodType": "B+", //["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
//   "age": 28,
//   "unit": 2
// }
