"use client";

import { useForm } from "react-hook-form";
import AuthBackground from "../_universal-components/_auth-components/auth-background";
import AuthButton from "../_universal-components/_auth-components/auth-button";
import AuthHeader from "../_universal-components/_auth-components/auth-header";
import AuthInput from "../_universal-components/_auth-components/auth-input";
import { useMutation } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: async (email) => {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(email),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send reset link");
      }

      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (data) => {
      toast.error(data.message);
    },
  });

  function handleForm(data) {
    mutation.mutate(data);
  }

  return (
    <AuthBackground>
      <Toaster position="bottom-right" />
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

        <AuthButton btnText="Send Reset Link" isLoading={mutation.isPending} />
      </form>
    </AuthBackground>
  );
}
