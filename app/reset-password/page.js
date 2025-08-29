"use client";

import { useForm } from "react-hook-form";
import AuthBackground from "../_universal-components/_auth-components/auth-background";
import AuthButton from "../_universal-components/_auth-components/auth-button";
import AuthHeader from "../_universal-components/_auth-components/auth-header";
import AuthInput from "../_universal-components/_auth-components/auth-input";
import AuthPasswordInfo from "../_universal-components/_auth-components/auth-password-info";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token, newPassword: formData.password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Cannot reset password for the meantime."
        );
      }

      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      router.push("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function handleForm(formData) {
    mutation.mutate(formData);
  }

  return (
    <AuthBackground>
      <Toaster position="bottom-right" />
      <AuthHeader
        title="Reset Your Password"
        subTitle="Choose a new password to secure your account."
      />
      <form className="mt-10" onSubmit={handleSubmit(handleForm)}>
        <AuthInput
          label="New Password"
          type="password"
          showEye={true}
          error={errors.password?.message}
          {...register("password", {
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
                /[0-9]/.test(value) ||
                "Password must contain at least one digit",
            },
          })}
        />
        <AuthPasswordInfo />
        <AuthInput
          label="Confirm New Password"
          type="password"
          showEye={true}
          className="mt-4"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === password || "The passwords do not match",
          })}
        />
        <AuthButton btnText="Reset Password" isLoading={mutation.isPending} />
      </form>
    </AuthBackground>
  );
}
