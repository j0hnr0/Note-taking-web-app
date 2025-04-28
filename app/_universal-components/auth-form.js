"use client";

import { useForm } from "react-hook-form";
import AuthButton from "./auth-button";
import AuthInput from "./auth-input";
import AuthPasswordInfo from "./auth-password-info";
import { useAuth } from "../contexts/auth-provider";
import { useState } from "react";

export default function AuthForm({
  btnText,
  isLoginPage,
  createPasswordValidation,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { register: registerUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ message: "", type: "" });

  const passwordValidation = createPasswordValidation
    ? {
        required: "Password is required",
        minLength: {
          value: 8,
          message: "Password must be at least 8 characters",
        },
        validate: {
          hasLowercase: (value) =>
            /[a-z]/.test(value) ||
            "Password must contain at least one lowercase letter",
          hasUppercase: (value) =>
            /[A-Z]/.test(value) ||
            "Password must contain at least one uppercase letter",
          hasSpecialChar: (value) =>
            /[^A-Za-z0-9]/.test(value) ||
            "Password must contain at least one special character",
          hasDigit: (value) =>
            /[0-9]/.test(value) || "Password must contain at least one digit",
        },
      }
    : {
        required: "Password is required",
      };

  async function handleForm(data) {
    setIsLoading((prev) => !prev);
    setStatus({ message: "", type: "" });

    const result = await registerUser(data);

    setIsLoading((prev) => !prev);

    if (result.success) {
      setStatus({ message: "Registration successful!", type: "success" });
    } else {
      setStatus({ message: result.error, type: "error" });
    }
  }

  return (
    <form className="mt-10" onSubmit={handleSubmit(handleForm)} noValidate>
      <div>
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
      </div>

      <div className="mt-4">
        <AuthInput
          label="Password"
          type="password"
          showForgot={isLoginPage}
          showEye={true}
          error={errors.password?.message}
          {...register("password", passwordValidation)}
        />
      </div>
      {!isLoginPage && <AuthPasswordInfo />}

      <AuthButton btnText={btnText} />
    </form>
  );
}
