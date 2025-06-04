import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  TextInput,
  PasswordInput,
  SelectInput,
  BackButton,
} from "@/components/ui/custom/FormElements";

export function BankForm({
  onSubmit,
  defaultValues = { password: "" }, //if I don't pass, it defined as null and result in uncontrolled error
  isEdit = false,
  loading,
}) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  // console.log(defaultValues);SUM Blood Bank 2SUM Blood Bank 2SUM Blood Bank 2

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-2xl shadow-md max-w-2xl w-full mx-auto space-y-6"
    >
      <BackButton />
      <h2 className="text-2xl text-center font-semibold text-gray-800 dark:text-gray-100 mb-4">
        {isEdit ? "Edit Bank Details" : "Create New Bank"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 dark:text-gray-100">
        <TextInput
          register={register}
          name="title"
          title="Bank Name"
          placeholder="National Bank"
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

        {isEdit ? null : (
          <PasswordInput
            control={control}
            name="password"
            title="Password"
            errors={errors}
          />
        )}
        <TextInput
          register={register}
          name="phone"
          title="Phone Number"
          placeholder="09987654321"
          errors={errors}
        />
        <TextInput
          register={register}
          name="city"
          title="City"
          placeholder="New York"
          errors={errors}
        />
        <div style={isEdit ? { gridColumnEnd: "span 2" } : null}>
          <TextInput
            register={register}
            name="address"
            title="Address"
            placeholder="123 Elm Street"
            errors={errors}
          />
        </div>
      </div>

      <TextInput
        register={register}
        name="description"
        title="Description"
        placeholder="Short description about the bank"
        errors={errors}
        required={false}
      />

      <SelectInput
        register={register}
        name="status"
        title="Status"
        options={["active", "suspend"]}
        placeholder="Choose status"
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
              : "Update Bank"
            : loading
            ? "Creating..."
            : "Create Bank"}
        </button>
      </div>
    </form>
  );
}
