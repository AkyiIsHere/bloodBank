import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  getRequestByID,
  deleteRequestByID,
} from "@/api/bank-dashboard/requests";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/custom/FormElements";
import { toast } from "sonner";
import { DeleteDialog } from "@/components/ui/custom/DeleteDialog";
import InfoRow from "@/components/ui/custom/InfoRow";

export default function BankDetail() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [delDialogOpen, setDelDialogOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const res = await getRequestByID(id);
        const request = res?.data?.request;

        if (!request) {
          setNotFound(true);
          toast.error(
            "Request not found. It may have been deleted or never existed."
          );
        } else {
          setData(request);
        }
      } catch (err) {
        console.error("Failed to fetch Donor Data", err);

        // If server returned a 404 or similar, show friendly message
        if (err?.response?.status === 404) {
          setNotFound(true);
          toast.error(
            "Request not found. It may have been deleted or never existed."
          );
        } else {
          // Generic error handling
          toast.error(
            err?.message || "Something went wrong while fetching the request"
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
        { label: "Phone", value: data.phone },
        { label: "Email", value: data.email },
        { label: "Address", value: data.address },
        { label: "Age", value: data.age },
        { label: "Blood Type", value: data.bloodType },
        { label: "Unit", value: data.unit },
        {
          label: "Status",
          value: (
            <span
              className={`font-medium ${
                data.status === "approved"
                  ? "text-green-600"
                  : data.status === "pending"
                  ? "text-yellow-600"
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

  function editRequest() {
    navigate(`/bank-dashboard/request-forms/edit/${id}`);
  }

  async function deleteRequest(id) {
    try {
      const res = await deleteRequestByID(id);
      toast.success(res.message);
      navigate(-1);
    } catch (err) {
      console.error("Failed to delete request", err);
      toast.error(err?.message || "Failed to delete request");
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <BackButton />
      <Card className="rounded-2xl shadow-lg border border-gray-200">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
            Request Detail
          </h2>
          {data && (
            <div className="space-x-2">
              <Button variant="outline" onClick={editRequest}>
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
              Loading request details...
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

      <DeleteDialog
        open={delDialogOpen}
        setOpen={setDelDialogOpen}
        itemId={id}
        onDelete={deleteRequest}
      />
    </div>
  );
}
