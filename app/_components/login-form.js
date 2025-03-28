import localFont from "next/font/local";

const interMed = localFont({
  src: "../../public/fonts/inter/static/Inter_18pt-Medium.ttf",
  display: "swap",
});

const interReg = localFont({
    src: "../../public/fonts/inter/static/Inter_18pt-Regular.ttf",
    display: "swap",
  });

export default function LoginForm() {
  return (
    <form className="mt-10">
      <div>
        <label
          htmlFor="email"
          className={`${interMed.className} antialiased font-medium text-sm text-custom-neutral-950`}
        >
          Email Address
        </label>
        <input
          id="email"
          name="email"
          placeholder="email@example.com"
          className={`${interReg.className} antialiased text-sm text-custom-neutral-950 w-full rounded-lg py-3 px-4 border-[1px] border-custom-neutral-300
          focus:outline-none`}
        />
      </div>
    </form>
  );
}
