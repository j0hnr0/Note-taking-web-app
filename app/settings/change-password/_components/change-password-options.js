"use client";

import AuthPasswordInfo from "@/app/_universal-components/_auth-components/auth-password-info";
import Input from "./input";
import ApplyChangesBtn from "../../_components/apply-changes-btn";
import { useForm } from "react-hook-form";

export default function ChangePasswordOptions() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("newPassword", "");

  function handleForm() {
    console.log("kiki do you love me");
  }

  return (
    <form
      onSubmit={handleSubmit(handleForm)}
      className="flex flex-col h-full py-5 px-6 w-full max-w-[562px]"
    >
      <small className="inter font-semibold text-base text-custom-neutral-950">
        Change Password
      </small>

      <Input
        label="Old Password"
        name="old-password"
        error={errors.oldPassword?.message}
        {...register("oldPassword", { required: "Password is required." })}
      />

      <Input
        label="New Password"
        name="new-password"
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
              /[0-9]/.test(value) || "Password must contain at least one digit",
          },
        })}
      />
      <AuthPasswordInfo />

      <Input
        label="Confirm New Password"
        name="confirm-new-password"
        {...register("confirmNewPassword", {
          required: "Please confirm your password",
          validate: (value) =>
            value === password || "The passwords do not match",
        })}
      />

      <ApplyChangesBtn text="Save Password" />
    </form>
  );
}
