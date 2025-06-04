const InfoRow = ({ label, value }) => (
  <div className="flex flex-col gap-1 ">
    <span className="text-sm font-medium text-gray-600 dark:text-gray-500">
      {label}
    </span>
    <div className="text-base text-gray-900 dark:text-gray-100 break-words">
      {value ?? "—"}
    </div>
  </div>
);

export default InfoRow;
