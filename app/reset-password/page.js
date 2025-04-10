import AuthButton from "../_universal-components/auth-button";
import AuthHeader from "../_universal-components/auth-header";
import AuthInput from "../_universal-components/auth-input";
import AuthPasswordInfo from "../_universal-components/auth-password-info";

export default function ResetPassword() {
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
          title="Reset Your Password"
          subTitle="Choose a new password to secure your account."
        />
        <form className="mt-10">
          <AuthInput label="New Password" type="password" showEye={true} />
          <AuthPasswordInfo />
          <AuthInput
            label="Confirm New Password"
            type="password"
            showEye={true}
            className="mt-4"
          />
          <AuthButton btnText="Reset Password" />
        </form>
      </div>
    </section>
  );
}
