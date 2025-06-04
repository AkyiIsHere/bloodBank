import { useForm } from "react-hook-form";
import { TextInput, BackButton } from "@/components/ui/custom/FormElements";
import { useState } from "react";

import DonorSelectorModal from "./DonorSelectorModal";
import RequestSelectModal from "./RequestSelectorModal";

export default function AppointmentForm({
  onSubmit,
  defaultValues = {},
  isEdit = false,
  loading,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ defaultValues });

  const [donorModalOpen, setDonorModalOpen] = useState(false);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [donor, setDonor] = useState(defaultValues.donor || null);
  const [bloodRequest, setBloodRequest] = useState(
    defaultValues.bloodRequest || null
  );

  const handleDonorSelect = (donor) => {
    setDonor(donor);
    setValue("donor", donor, { shouldValidate: true });
    setDonorModalOpen(false);
  };

  const handleRequestSelect = (request) => {
    setBloodRequest(request);
    setValue("bloodRequest", request, { shouldValidate: true });
    setRequestModalOpen(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-2xl shadow-md max-w-2xl w-full mx-auto space-y-6"
    >
      <BackButton />
      <h2 className="text-2xl text-center font-semibold text-gray-800 dark:text-gray-100 mb-4">
        {isEdit ? "Edit Appointment Details" : "Create New Appointment"}
      </h2>

      {/* Donor Selector */}
      <div>
        <label className="block text-xs text-gray-500 mb-1 ml-1">
          Donor<span className="text-red-500 text-lg">*</span>
        </label>
        <div className="flex rounded-lg border border-gray-300 overflow-hidden shadow-sm w-full">
          {/* Left: Display selected donor info (75%) */}
          <div className="flex-4 bg-gray-100 dark:bg-zinc-900 px-4 py-2 text-sm text-gray-700 flex items-center">
            {donor ? (
              <div className="flex items-center space-x-4 dark:text-gray-100">
                <p className="font-medium">{donor.name}</p>
                {/* <p className="text-xs text-gray-500">ID: {donor._id}</p> */}
                <p className="text-xs text-gray-500 dark:text-gray-200">
                  Blood Type: {donor.bloodType}
                </p>
              </div>
            ) : (
              <span className="text-gray-400 italic">No donor selected</span>
            )}
          </div>

          {/* Right: Button to open modal (25%) */}
          <button
            type="button"
            onClick={() => setDonorModalOpen(true)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium whitespace-nowrap rounded-lg cursor-pointer"
          >
            {donor ? "Change" : "Select"}
          </button>
        </div>

        {/* Hidden input for form submission */}
        <input
          type="hidden"
          value={donor?._id ?? ""}
          {...register("donor", { required: true })}
        />
        {errors.donor && (
          <p className="text-sm text-red-600 mt-1">Donor is required</p>
        )}
      </div>

      {/* Request Selector */}
      <div>
        <label className="block text-xs text-gray-500 mb-1 ml-1">
          Blood Request<span className="text-red-500 text-lg">*</span>
        </label>
        <div className="flex rounded-lg border border-gray-300 overflow-hidden shadow-sm w-full">
          {/* Left: Display selected donor info (75%) */}
          <div className="flex-4 bg-gray-100 dark:bg-zinc-900 px-4 py-2 text-sm text-gray-700 flex items-center">
            {bloodRequest ? (
              <div className="flex items-center space-x-4 dark:text-gray-100">
                <p className="font-medium">{bloodRequest.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-200">
                  Blood Type: {bloodRequest.bloodType}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-200">
                  Unit: {bloodRequest.unit}
                </p>
              </div>
            ) : (
              <span className="text-gray-400 italic">No request selected</span>
            )}
          </div>

          {/* Right: Button to open modal (25%) */}
          <button
            type="button"
            onClick={() => setRequestModalOpen(true)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium whitespace-nowrap rounded-lg cursor-pointer "
          >
            {bloodRequest ? "Change" : "Select"}
          </button>
        </div>

        {/* Hidden input for form submission */}
        <input
          type="hidden"
          value={bloodRequest?._id ?? ""}
          {...register("bloodRequest", { required: true })}
        />

        {errors.bloodRequest && (
          <p className="text-sm text-red-600 mt-1">Request is required</p>
        )}
      </div>

      {/* Other fields */}

      <TextInput
        register={register}
        name="date"
        title="Date"
        placeholder="Enter Date"
        errors={errors}
        type="datetime-local"
      />

      <div className="text-center pt-4">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 cursor-pointer"
          disabled={loading}
        >
          {isEdit
            ? loading
              ? "Updating..."
              : "Update Appointment"
            : loading
            ? "Creating..."
            : "Create Appointment"}
        </button>
      </div>

      {/* Donor Modal */}
      <DonorSelectorModal
        isOpen={donorModalOpen}
        onClose={() => setDonorModalOpen(false)}
        onSelect={handleDonorSelect}
      />

      {/* Request Modal */}
      <RequestSelectModal
        isOpen={requestModalOpen}
        onClose={() => setRequestModalOpen(false)}
        onSelect={handleRequestSelect}
      />
    </form>
  );
}
