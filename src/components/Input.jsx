export default function Input({
  type,
  name,
  value,
  onChange,
  placeholder,
  label,
}) {
  return (
    <div className="mb-6">
      <label
        htmlFor={name}
        className="block mb-2 text-left font-semibold text-[#4a5568] text-sm"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full p-4  border-2 border-[#e2e8f0] rounded-[12px] text-base transition-all duration-300 ease-[ease] bg-[#f7fafc]"
        required
     />
    </div>
  );
}
