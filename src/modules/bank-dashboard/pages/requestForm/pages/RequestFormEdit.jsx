import { useEffect, useState } from "react";
import RequestForm from "../components/RequestFormFormat";
import { useNavigate, useParams } from "react-router";
import { getRequestByID, updateRequest } from "@/api/bank-dashboard/requests";
import { toast } from "sonner";

export default function DonorEdit() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getRequestByID(id);
        const data = res?.data.request;
        if (!data) {
          console.warn("Request data is missing or undefined");
          return;
        }

        setData(data);
        console.log(res?.message);
      } catch (err) {
        console.error("Failed to fetch Request Data", err);
        err.message ? toast.error(err.message) : null;
      }
    };
    fetchData();
  }, []);

  async function handleUpdate(data) {
    const requiredData = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: data.address,
      age: data.age,
      bloodType: data.bloodType.toUpperCase(),
      unit: data.unit,
    };
    setLoading(true);
    try {
      const res = await updateRequest(id, requiredData);
      console.log(res);
      toast.success(res?.message);
      navigate(-1);
    } catch (err) {
      console.error("Failed to updated donor: ", err);
      toast.error(
        err.response
          ? err.response.data.error +
              " - " +
              err.response.data.details.join(". ") || "Donor Update Failed!"
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {data ? (
        <RequestForm
          onSubmit={handleUpdate}
          defaultValues={data}
          loading={loading}
          isEdit
        />
      ) : (
        "Loading..."
      )}
    </div>
  );
}
