'use client';

import { useForm } from "react-hook-form";
import AuthBackground from "../_universal-components/_auth-components/auth-background";
import AuthButton from "../_universal-components/_auth-components/auth-button";
import AuthHeader from "../_universal-components/_auth-components/auth-header";
import AuthInput from "../_universal-components/_auth-components/auth-input";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function handleForm() {
    console.log("kiki do you love me");
  }

  return (
    <AuthBackground>
      <AuthHeader
        title="Forgotten your password?"
        subTitle="Enter your email below, and we'll send you a link to reset it."
      />
      <form className="mt-10" onSubmit={handleSubmit(handleForm)} noValidate>
        <AuthInput
          label="Email Address"
          placeholder="email@example.com"
          type="email"
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please enter a valid email address",
            },
            maxLength: {
              value: 100,
              message: "Please enter a valid email address",
            },
          })}
        />

        <AuthButton btnText="Send Reset Link" />
      </form>
    </AuthBackground>
  );
}
