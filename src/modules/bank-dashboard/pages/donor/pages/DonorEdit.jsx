import { useNavigate, useParams } from "react-router";
import DonorForm from "../components/DonorForm";
import { useEffect, useState } from "react";
import { getDonorByID, updateDonor } from "@/api/bank-dashboard/donors";
import { toast } from "sonner";

export default function DonorEdit() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fixing date object not appearing in date input
  const formattedData = data
    ? { ...data, dob: new Date(data.dob).toISOString().split("T")[0] }
    : null;

  // console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDonorByID(id);
        const data = res?.data.donor;

        if (!data) {
          console.warn("Request data is missing or undefined");
          return;
        }

        setData(data);
        console.log(res?.message);
      } catch (err) {
        console.error("Failed to fetch Donor Detail: ", err);
        err.message ? toast.error(err.message) : null;
      }
    };

    fetchData();
  }, []);

  async function handleUpdate(data) {
    const requiredData = {
      name: data.name,
      phone: data.phone,
      dob: data.dob, // YYYY-MM-DD
      gender: data.gender,
      address: data.address,
      bloodType: data.bloodType.toUpperCase,
      weight: +data.weight,
    };
    setLoading(true);
    try {
      const res = await updateDonor(id, requiredData);
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
        <DonorForm
          onSubmit={handleUpdate}
          defaultValues={formattedData}
          loading={loading}
          isEdit
        />
      ) : (
        "Loading..."
      )}
    </div>
  );
}
