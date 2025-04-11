import Link from "next/link";

export default function AuthInput({
  label,
  placeholder,
  type,
  showForgot,
  showEye,
  className,
}) {
  return (
    <div className={className}>
      <div className="flex justify-between items-center">
        <label
          htmlFor={type}
          className="inter font-medium text-sm text-custom-neutral-950"
        >
          {label}
        </label>
        {showForgot && (
          <Link
            href="/forgot-password"
            type="button"
            className="inter font-normal text-xs text-custom-neutral-600 underline cursor-pointer"
          >
            Forgot
          </Link>
        )}
      </div>
      <div className="relative">
        <input
          id={type}
          name={type}
          placeholder={placeholder}
          className="inter font-normal text-sm text-custom-neutral-950 w-full rounded-lg py-3 px-4 border-[1px] border-custom-neutral-300
          focus:outline-none"
        />

        {showEye && (
          <div className="absolute top-3 right-4 bg-white pl-1.5">
            <button type="button" className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="#0E121B"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M6.42 17.73c-2.23-1.46-3.67-3.66-3.67-5.59 0-3.28 4.14-7.3 9.25-7.3 2.09 0 4.03.67 5.59 1.71M19.85 8.61c.891 1.13 1.41 2.38 1.41 3.53 0 3.28-4.15 7.3-9.26 7.3-.91 0-1.799-.13-2.63-.36"
                />
                <path
                  stroke="#0E121B"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M9.766 14.367a3.12 3.12 0 0 1-.925-2.23 3.159 3.159 0 0 1 5.394-2.24M15.11 12.7a3.158 3.158 0 0 1-2.538 2.541M19.892 4.25 4.118 20.024"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
