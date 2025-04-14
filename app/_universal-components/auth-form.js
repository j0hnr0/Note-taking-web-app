import AuthButton from "./auth-button";
import AuthInput from "./auth-input";
import AuthPasswordInfo from "./auth-password-info";

export default function AuthForm({ btnText, isLoginPage }) {
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
          showForgot={isLoginPage}
          showEye={true}
        />
      </div>
      {!isLoginPage && <AuthPasswordInfo />}

      <AuthButton btnText={btnText} />
    </form>
  );
}
