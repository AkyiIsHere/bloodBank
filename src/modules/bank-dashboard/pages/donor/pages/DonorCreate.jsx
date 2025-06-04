import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { createDonor } from "@/api/bank-dashboard/donors";
import DonorForm from "../components/DonorForm";

export default function DonorsCreate() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    const formattedData = {
      ...data,
      weight: +data.weight,
      bloodType: data.bloodType.toUpperCase(),
    };
    setLoading(true);
    try {
      const res = await createDonor(formattedData);
      toast.success(res.message);
      console.log(res);

      navigate(-1);
    } catch (err) {
      console.error("Create Donor Failed: ", err);
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
      <DonorForm onSubmit={handleCreate} loading={loading} />
    </div>
  );
}
