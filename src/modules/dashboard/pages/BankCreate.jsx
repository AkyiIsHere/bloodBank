import { BankForm } from "../components/BankForm";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { createBank } from "@/api/dashboard/banks";
import { useState } from "react";

export default function BankCreate() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    setLoading(true);
    try {
      const res = await createBank(data);
      toast.success(res?.message || "Bank created successfully!");
      navigate(-1);
      console.log(res?.message);
    } catch (err) {
      console.error("Bank Create Failed: ", err);
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
      <BankForm onSubmit={handleCreate} loading={loading} />
    </div>
  );
}
