import localFont from "next/font/local";
import Logo from "./logo";

const interBold = localFont({
  src: "../../public/fonts/inter/static/Inter_18pt-Bold.ttf",
  display: "swap",
});

const interReg = localFont({
  src: "../../public/fonts/inter/static/Inter_18pt-Regular.ttf",
  display: "swap",
});

export default function ForgotHeader() {
  return (
    <>
      <div className="flex justify-center items-center">
        <Logo />
      </div>
      <div className="text-center mt-4">
        <h1
          className={`${interBold.className} antialiased font-bold text-2xl text-custom-neutral-950`}
        >
          Forgotten your password?
        </h1>
        <h2
          className={`${interReg.className} mt-2 antialiased text-sm text-custom-neutral-600`}
        >
          Enter your email below, and we'll send you a link to reset it.
        </h2>
      </div>
    </>
  );
}
