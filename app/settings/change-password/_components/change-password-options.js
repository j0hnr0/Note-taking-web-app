"use client";

import AuthPasswordInfo from "@/app/_universal-components/_auth-components/auth-password-info";
import Input from "./input";
import ApplyChangesBtn from "../../_components/apply-changes-btn";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

export default function ChangePasswordOptions() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const password = watch("newPassword", "");

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await fetch("/api/auth/change-password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update password");
      }

      return data;
    },
    onSuccess: (data) => {
      toast.success("Password updated successfully");
      reset();
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong!");
    },
  });

  function handleForm(formData) {
    mutation.mutate(formData);
  }

  return (
    <>
      <Toaster position="bottom-right" />
      <form
        onSubmit={handleSubmit(handleForm)}
        className="flex flex-col h-full py-5 px-6 w-full max-w-[562px] max-custom-md:max-w-full max-custom-sm:mb-16"
        noValidate
      >
        <small className="font-semibold text-base text-custom-neutral-950 dark:text-white">
          Change Password
        </small>

        <Input
          label="Old Password"
          name="oldPassword"
          error={errors.oldPassword?.message}
          {...register("oldPassword", { required: "Password is required." })}
        />

        <Input
          label="New Password"
          name="newPassword"
          error={errors.newPassword?.message}
          {...register("newPassword", {
            required: "New password is required.",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters.",
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

        <Input
          label="Confirm New Password"
          name="confirmNewPassword"
          error={errors.confirmNewPassword?.message}
          {...register("confirmNewPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === password || "The passwords do not match",
          })}
        />

        <ApplyChangesBtn
          text={mutation.isPending ? "Saving..." : "Save Password"}
          disabled={mutation.isPending}
        />
      </form>
    </>
  );
}
