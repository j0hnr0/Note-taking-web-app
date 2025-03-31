import localFont from "next/font/local";
import ForgotInput from "./forgot-input";

const interSemi = localFont({
  src: "../../public/fonts/inter/static/Inter_18pt-SemiBold.ttf",
  display: "swap",
});

export default function ForgotForm() {
  return (
    <form className="mt-10">
      <div>
        <ForgotInput
          label="Email"
          placeholder="email@example.com"
          type="email"
        />
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="w-full py-3 text-center bg-custom-blue-500 rounded-lg cursor-pointer"
        >
          <h5
            className={`${interSemi.className} antialiased font-semibold text-base text-white`}
          >
            Send Reset Link
          </h5>
        </button>
      </div>
    </form>
  );
}
