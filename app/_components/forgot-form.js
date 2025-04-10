import ForgotInput from "./forgot-input";

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
            className="inter font-semibold text-base text-white"
          >
            Send Reset Link
          </h5>
        </button>
      </div>
    </form>
  );
}
