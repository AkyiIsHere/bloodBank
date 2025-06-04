import { useForm } from "react-hook-form";
import {
  TextInput,
  SelectInput,
  BackButton,
} from "@/components/ui/custom/FormElements";
import { useEffect } from "react";

export default function DonorForm({
  onSubmit,
  defaultValues = {},
  isEdit = false,
  loading,
}) {
  const initialValues = defaultValues
    ? {
        ...defaultValues,
        bloodType: defaultValues.bloodType?.toLowerCase() || "",
      }
    : {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  console.log(defaultValues);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-2xl shadow-md max-w-2xl w-full mx-auto space-y-6"
    >
      <BackButton />
      <h2 className="text-2xl text-center font-semibold text-gray-800 dark:text-gray-100 mb-4">
        {isEdit ? "Edit Donor Details" : "Create New Donor"}
      </h2>

      {/* // Donar => name / phone / dob ( date of birth ) / gender / address / blood_type / weight */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput
          register={register}
          name="name"
          title="Donor Name"
          placeholder="Alice"
          errors={errors}
        />

        <TextInput
          register={register}
          name="dob"
          title="Date of Birth"
          errors={errors}
          type="date"
        />
        <TextInput
          register={register}
          name="phone"
          title="Phone Number"
          placeholder="09987654321"
          errors={errors}
        />
        <SelectInput
          register={register}
          name="gender"
          title="Gender"
          placeholder="Gender"
          options={["Male", "Female", "Other"]}
          errors={errors}
        />
        <TextInput
          register={register}
          name="weight"
          title="Weight (kg)"
          type="number"
        />
        <SelectInput
          register={register}
          name="bloodType"
          title="Blood Type"
          placeholder="Blood Type"
          options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]}
          errors={errors}
        />
      </div>
      <TextInput
        register={register}
        name="address"
        title="Address"
        placeholder="123 Elm Street"
        errors={errors}
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
              : "Update Donor"
            : loading
            ? "Creating..."
            : "Create Donor"}
        </button>
      </div>
    </form>
  );
}
