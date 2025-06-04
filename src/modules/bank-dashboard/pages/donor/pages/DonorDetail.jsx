import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getDonorByID, deleteDonorByID } from "@/api/bank-dashboard/donors";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/custom/FormElements";
import { toast } from "sonner";
import InfoRow from "@/components/ui/custom/InfoRow";
import { DeleteDialog } from "@/components/ui/custom/DeleteDialog";

export default function BankDetail() {
  const [data, setData] = useState(null);
  const [delDialogOpen, setDelDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setNotFound(false);

      try {
        const res = await getDonorByID(id);
        const donor = res?.data?.donor;

        if (!donor) {
          setNotFound(true);
          toast.error(
            "Donor not found. It may have been deleted or never existed."
          );
        } else {
          setData(donor);
        }
      } catch (err) {
        console.error("Failed to fetch Donor Data", err);

        // If server returned a 404 or similar, show friendly message
        if (err?.response?.status === 404) {
          setNotFound(true);
          toast.error(
            "Donor not found. It may have been deleted or never existed."
          );
        } else {
          // Generic error handling
          toast.error(
            err?.message || "Something went wrong while fetching the donor"
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const fields = data
    ? [
        { label: "ID", value: data._id },
        { label: "Name", value: data.name },
        {
          label: "Date of Birth",
          value: new Date(data.dob).toLocaleDateString(),
        },
        { label: "Gender", value: data.gender },
        { label: "Address", value: data.address },
        { label: "Blood Type", value: data.bloodType },
        { label: "Phone", value: data.phone },
        { label: "Weight", value: data.weight },
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

  function editDonor() {
    navigate(`/bank-dashboard/donors/edit/${id}`);
  }

  async function deleteDonor(id) {
    try {
      const res = await deleteDonorByID(id);
      toast.success(res.message);
      navigate(-1);
    } catch (err) {
      console.error("Failed to delete Donor: ", err);
      toast.error(
        err?.message || "Something went wrong while deleting the donor"
      );
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <BackButton />
      <Card className="rounded-2xl shadow-lg border border-gray-200">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
            Donor Detail
          </h2>
          {data && (
            <div className="space-x-2">
              <Button variant="outline" onClick={editDonor}>
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => setDelDialogOpen(true)}
              >
                Delete
              </Button>
            </div>
          )}
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="text-center text-gray-500 py-10">
              Loading donor details...
            </div>
          ) : notFound ? (
            <div className="text-center text-red-500 font-medium py-10">
              Request not found.{" "}
              <span className="text-gray-500">
                (It may have been deleted or never existed.)
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-800">
              {dataElements}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Separate dialog component */}
      <DeleteDialog
        open={delDialogOpen}
        setOpen={setDelDialogOpen}
        itemId={id}
        onDelete={deleteDonor}
      />
    </div>
  );
}
