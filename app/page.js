import AuthBackground from "./_universal-components/auth-background";
import AuthFooter from "./_universal-components/auth-footer";
import AuthForm from "./_universal-components/auth-form";
import AuthHeader from "./_universal-components/auth-header";

export default function Home() {
  return (
    <AuthBackground>
      <AuthHeader
        title="Welcome to Note"
        subTitle="Please log in to continue"
      />
      <AuthForm btnText="Login" isLoginPage={true} />
      <AuthFooter isLoginPage={true} />
    </AuthBackground>
  );
}
