// Reusable Button component
export default function Button({ href, children, primary }) {
  return (
    <a
      href={href}
      className={`px-6 py-3 rounded-lg font-semibold transition-all shadow-sm text-center ${
        primary
          ? "bg-red-600 text-white hover:bg-red-700"
          : "bg-white border border-red-600 text-red-700 hover:bg-red-100"
      }`}
    >
      {children}
    </a>
  );
}
