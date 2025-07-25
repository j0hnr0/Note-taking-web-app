export default function AuthGoogleBtn() {
  return (
    <button
      type="button"
      className="mt-4 w-full rounded-xl py-3 flex justify-center items-center gap-4 border-[1px] border-custom-neutral-300 cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="25"
        fill="none"
        viewBox="0 0 24 25"
      >
        <path
          className="fill-[#0E121B] dark:fill-white"
          fill="#0E121B"
          fillRule="evenodd"
          d="M20.838 14.718a8.932 8.932 0 0 0 .086-2.857.558.558 0 0 0-.557-.473h-7.805a.562.562 0 0 0-.562.562v2.206c0 .31.252.562.562.562h4.275c.176 0 .305.18.239.343-.935 2.31-3.39 3.826-6.132 3.32-2.106-.39-3.832-2.06-4.284-4.153a5.477 5.477 0 0 1 8.369-5.776.572.572 0 0 0 .73-.06l1.703-1.733a.559.559 0 0 0-.046-.832 8.897 8.897 0 0 0-5.161-1.815c-4.872-.135-9.091 3.823-9.25 8.694-.167 5.108 3.927 9.302 8.995 9.302 4.383 0 8.037-3.14 8.838-7.29Z"
          clipRule="evenodd"
        />
      </svg>
      <h5
        className="inter font-medium text-custom-neutral-950 dark:text-white text-base"
      >
        Google
      </h5>
    </button>
  );
}
