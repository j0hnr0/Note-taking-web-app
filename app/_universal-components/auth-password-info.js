import Image from "next/image";

export default function AuthPasswordInfo() {
  return (
    <div className="mt-1.5 flex justify-start items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="#0E121B"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0ZM12.006 15.693v-4.3M12 8.355v-.063"
        />
      </svg>
      <span className="inter font-normal text-xs text-custom-neutral-600">
        At least 8 characters
      </span>
    </div>
  );
}
