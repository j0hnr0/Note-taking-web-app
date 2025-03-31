import LoginInput from "./login-input";
import localFont from "next/font/local";

const interSemi = localFont({
  src: "../../public/fonts/inter/static/Inter_18pt-SemiBold.ttf",
  display: "swap",
});

export default function LoginForm() {
  return (
    <form className="mt-10">
      <div>
        <LoginInput
          label="Email"
          placeholder="email@example.com"
          type="email"
          identifier="email"
        />
      </div>

      <div className="mt-4">
        <LoginInput label="Password" type="password" identifier="password" />
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="w-full py-3 text-center bg-custom-blue-500 rounded-lg cursor-pointer"
        >
          <h5
            className={`${interSemi.className} antialiased font-semibold text-base text-white`}
          >
            Login
          </h5>
        </button>
      </div>
    </form>
  );
}
