import { useForm } from "react-hook-form";
import {
  TextInput,
  SelectInput,
  BackButton,
} from "@/components/ui/custom/FormElements";
import { useEffect } from "react";

export default function RequestForm({
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
  //   Blood Request => name / phone / email / address / age / blood type / unit / status

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-2xl shadow-md max-w-2xl w-full mx-auto space-y-6"
    >
      <BackButton />
      <h2 className="text-2xl text-center font-semibold text-gray-800 dark:text-gray-100 mb-4">
        {isEdit ? "Edit Request Details" : "Create New Request"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput
          register={register}
          name="name"
          title="Name"
          placeholder="Enter Name"
          errors={errors}
        />
        <TextInput
          register={register}
          name="phone"
          title="Phone Number"
          placeholder="09987654321"
          errors={errors}
        />
        <TextInput
          register={register}
          name="email"
          title="Email"
          type="email"
          placeholder="alice@gmail.com"
          errors={errors}
        />
        <TextInput
          register={register}
          name="address"
          title="Address"
          placeholder="123 Elm Street"
          errors={errors}
        />
        <TextInput
          register={register}
          name="age"
          title="Age"
          errors={errors}
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
        <TextInput
          register={register}
          name="unit"
          title="Units Required"
          placeholder="1"
          type="number"
          errors={errors}
        />
        <SelectInput
          register={register}
          name="status"
          title="Status"
          options={["approved", "pending", "rejected"]}
          placeholder="Choose status"
          errors={errors}
        />
      </div>

      <div className="text-center pt-4">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
          disabled={loading}
        >
          {loading
            ? isEdit
              ? "Updating..."
              : "Creating..."
            : isEdit
            ? "Update Request"
            : "Create Request"}
        </button>
      </div>
    </form>
  );
}
