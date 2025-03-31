import localFont from "next/font/local";

const interMed = localFont({
  src: "../../public/fonts/inter/static/Inter_18pt-Medium.ttf",
  display: "swap",
});

const interReg = localFont({
  src: "../../public/fonts/inter/static/Inter_18pt-Regular.ttf",
  display: "swap",
});

export default function ForgotInput({ label, placeholder, type }) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <label
          htmlFor={type}
          className={`${interMed.className} antialiased font-medium text-sm text-custom-neutral-950`}
        >
          {label}
        </label>
      </div>
      <div className="relative">
        <input
          id={type}
          name={type}
          placeholder={placeholder}
          className={`${interReg.className} antialiased text-sm text-custom-neutral-950 w-full rounded-lg py-3 px-4 border-[1px] border-custom-neutral-300
          focus:outline-none`}
        />
      </div>
    </div>
  );
}
