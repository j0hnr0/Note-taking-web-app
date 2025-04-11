import AuthButton from "./auth-button";
import AuthInput from "./auth-input";

export default function AuthForm() {
  return (
    <form className="mt-10">
      <div>
        <AuthInput
          label="Email"
          placeholder="email@example.com"
          type="email"
          identifier="email"
        />
      </div>

      <div className="mt-4">
        <AuthInput
          label="Password"
          type="password"
          showForgot={true}
          showEye={true}
        />
      </div>
      <AuthButton btnText="Login" />
    </form>
  );
}
