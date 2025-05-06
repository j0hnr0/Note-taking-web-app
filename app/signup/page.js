import AuthBackground from "../_universal-components/_auth-components/auth-background";
import AuthFooter from "../_universal-components/_auth-components/auth-footer";
import AuthForm from "../_universal-components/_auth-components/auth-form";
import AuthHeader from "../_universal-components/_auth-components/auth-header";

export default function SignUp() {
  return (
    <AuthBackground>
      <AuthHeader
        title="Create Your Account"
        subTitle="Sign up to start organizing your notes and boost your productivity."
      />
      <AuthForm btnText="Sign up" isLoginPage={false} createPasswordValidation={true} />
      <AuthFooter isLoginPage={false} />
    </AuthBackground>
  );
}
