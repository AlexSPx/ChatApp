type Props = {
  label: string;
  placeholder: string;
  type: "text" | "email" | "password";
  required?: boolean;
};

export default function Field({
  label,
  placeholder,
  type,
  required = true,
}: Props) {
  return (
    <label className="block my-4">
      <span className="block mb-1 text-xs font-medium">{label}</span>
      <input
        className="appearance-none w-full p-2 rounded bg-gray-200 placeholder-gray-500 placeholder:italic text-gray-800"
        type={type}
        placeholder={placeholder}
        required={required}
      />
    </label>
  );
}
