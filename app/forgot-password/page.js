import AuthBackground from "../_universal-components/auth-background";
import AuthButton from "../_universal-components/auth-button";
import AuthHeader from "../_universal-components/auth-header";
import AuthInput from "../_universal-components/auth-input";

export default function ForgotPassword() {
  return (
    <AuthBackground>
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
    </AuthBackground>
  );
}
