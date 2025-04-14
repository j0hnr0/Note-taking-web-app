"use client";

import { useForm } from "react-hook-form";
import AuthButton from "./auth-button";
import AuthInput from "./auth-input";
import AuthPasswordInfo from "./auth-password-info";

export default function AuthForm({ btnText, isLoginPage }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function handleForm() {
    console.log("kiki do you love me");
  }

  return (
    <form className="mt-10" onSubmit={handleSubmit(handleForm)}>
      <div>
        <AuthInput
          label="Email"
          placeholder="email@example.com"
          type="email"
          identifier="email"
          error={errors.email?.message}
          {...register("email", { required: "Email is required" })}
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
