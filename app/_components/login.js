import LoginFooter from "./login-footer";
import LoginForm from "./login-form";
import LoginHeader from "./login-header";

export default function Login() {
  return (
    <div className="w-full max-w-[540px] mx-auto p-12 bg-white rounded-xl filter drop-shadow-[0_8px_12px_rgba(240,240,240,0.6)] border-[1px] border-custom-neutral-200">
      <LoginHeader />
      <LoginForm />
      <LoginFooter />
    </div>
  );
}
