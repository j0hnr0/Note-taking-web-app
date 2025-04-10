export default function ForgotInput({ label, placeholder, type }) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <label
          htmlFor={type}
          className="inter font-medium text-sm text-custom-neutral-950"
        >
          {label}
        </label>
      </div>
      <div className="relative">
        <input
          id={type}
          name={type}
          placeholder={placeholder}
          className="inter font-normal text-sm text-custom-neutral-950 w-full rounded-lg py-3 px-4 border-[1px] border-custom-neutral-300
          focus:outline-none"
        />
      </div>
    </div>
  );
}
