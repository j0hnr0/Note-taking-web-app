import LoginInput from "./login-input";

export default function LoginForm() {
  return (
    <form className="mt-10">
      <div>
        <LoginInput
          label="Email"
          placeholder="email@example.com"
          type="email"
          identifier="email"
        />
      </div>

      <div className="mt-4">
        <LoginInput label="Password" type="password" identifier="password" />
      </div>
    </form>
  );
}
