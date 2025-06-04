import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Controller } from "react-hook-form";

// export function SelectInput({
//   register,
//   name,
//   title,
//   options,
//   placeholder,
//   errors,
//   required = true,
// }) {
//   return (
//     <div>
//       <p className="text-xs text-gray-500 mb-1 ml-1">{title}</p>
//       <select
//         {...register(
//           name,
//           required ? { required: `${title} is required` } : {}
//         )}
//         className="input dark:bg-zinc-900"
//       >
//         <option value="">{placeholder}</option>
//         {options.map((opt) => (
//           <option
//             key={opt}
//             value={name === "bloodType" ? opt : opt.toLowerCase()}
//           >
//             {opt}
//           </option>
//         ))}
//       </select>
//       {errors?.[name] && (
//         <p className="text-red-500 text-sm ms-2">{errors[name].message}</p>
//       )}
//     </div>
//   );
// }

export function SelectInput({
  register,
  name,
  title,
  options,
  placeholder,
  errors,
  required = true,
  forceLight = false,
}) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1 ml-1">
        {title} <span className="text-red-500 text-lg">*</span>
      </p>
      <select
        {...register(
          name,
          required ? { required: `${title} is required` } : {}
        )}
        className={`input border rounded px-3 py-2 w-full
          ${
            forceLight
              ? "bg-white text-black border-gray-300 !important"
              : "bg-white text-black dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
          }`}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt.toLowerCase()}>
            {opt}
          </option>
        ))}
      </select>
      {errors?.[name] && (
        <p className="text-red-500 text-sm ms-2">{errors[name].message}</p>
      )}
    </div>
  );
}

export function TextInput({
  register,
  name,
  placeholder,
  title,
  type = "text",
  errors,
  required = true,
  forceLight = false,
}) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1 ml-1">
        {title} {required && <span className="text-red-500 text-lg">*</span>}
      </p>
      <input
        {...register(
          name,
          required ? { required: `${title} is required` } : {}
        )}
        type={type}
        placeholder={placeholder}
        // defaultValue={placeholder}
        min={type === "number" ? 1 : null}
        className={`input border rounded px-3 py-2 w-full
          ${
            forceLight
              ? "bg-white text-black  border-gray-300 !important"
              : "bg-white text-black dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
          }`}
      />
      {errors?.[name] && (
        <p className="text-red-500 text-sm ms-2">{errors[name].message}</p>
      )}
    </div>
  );
}

export function PasswordInput({ control, name, title, errors }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <p className="text-xs text-gray-500 mb-1 ml-1">
        {title}
        <span className="text-red-500 text-lg">*</span>
      </p>
      <div className="relative">
        <Controller
          name={name}
          control={control}
          rules={{
            required: `${title} is required`,
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              type={showPassword ? "text" : "password"}
              className="input"
              placeholder="Enter your password"
            />
          )}
        />
        <button
          type="button"
          onMouseDown={() => setShowPassword(true)}
          onMouseUp={() => setShowPassword(false)}
          onMouseLeave={() => setShowPassword(false)}
          onTouchStart={() => setShowPassword(true)}
          onTouchEnd={() => setShowPassword(false)}
          className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {errors?.[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  );
}

export function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="my-3 px-4 py-2 bg-white dark:bg-zinc-800  hover:bg-gray-100 dark:hover:bg-gray-900  text-gray-700 dark:text-gray-100 rounded-md text-sm shadow-sm transition cursor-pointer"
    >
      <ArrowLeft className="w-4 h-4" />
    </button>
  );
}
