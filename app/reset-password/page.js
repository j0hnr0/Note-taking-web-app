import AuthBackground from "../_universal-components/auth-background";
import AuthButton from "../_universal-components/auth-button";
import AuthHeader from "../_universal-components/auth-header";
import AuthInput from "../_universal-components/auth-input";
import AuthPasswordInfo from "../_universal-components/auth-password-info";

export default function ResetPassword() {
  return (
    <AuthBackground>
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
    </AuthBackground>
  );
}
