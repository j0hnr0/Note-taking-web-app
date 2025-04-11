import AuthButton from "../_universal-components/auth-button";
import AuthHeader from "../_universal-components/auth-header";
import AuthInput from "../_universal-components/auth-input";

export default function ForgotPassword() {
  return (
    <section
      className="bg-custom-neutral-100 h-screen flex justify-center items-center
        max-custom-sm:px-5"
    >
      <div
        className="w-full max-w-[540px] mx-auto p-12 bg-white rounded-xl filter drop-shadow-[0_8px_12px_rgba(240,240,240,0.6)] border-[1px] border-custom-neutral-200
              max-custom-md:px-8
              max-custom-sm:py-10 max-custom-sm:px-4"
      >
        <AuthHeader
          title="Forgotten your password?"
          subTitle="Enter your email below, and we'll send you a link to reset it."
        />
        <form className="mt-10">
          <AuthInput
            label="Email Address"
            placeholder="email@example.com"
            type="email"
            identifier=""
          />

          <AuthButton btnText="Send Reset Link" />
        </form>
      </div>
    </section>
  );
}
