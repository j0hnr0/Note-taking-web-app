"use client";

import Link from "next/link";
import { useState } from "react";
import EyeSlashIcon from "../_svg-components/eye-slash-icon";
import EyeIcon from "../_svg-components/eye-icon";
import clsx from "clsx";

export default function AuthInput({
  label,
  placeholder,
  type,
  showForgot,
  showEye,
  className,
  ref,
  error,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const passwordInputType = showPassword ? "text" : "password";

  function handleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  return (
    <div className={className}>
      <div className="flex justify-between items-center">
        <label
          htmlFor={type}
          className="font-medium text-sm text-custom-neutral-950 dark:text-white"
        >
          {label}
        </label>
        {showForgot && (
          <Link
            href="/forgot-password"
            type="button"
            className="font-normal text-xs text-custom-neutral-600 dark:text-custom-neutral-400 underline cursor-pointer"
          >
            Forgot
          </Link>
        )}
      </div>
      <div className="relative">
        <input
          id={type}
          name={type}
          placeholder={placeholder}
          type={showEye ? passwordInputType : type}
          ref={ref}
          className={clsx(
            `font-normal text-sm text-custom-neutral-950 dark:text-custom-neutral-500 w-full rounded-lg py-3 px-4 border-[1px]
          focus:outline-none`,
            {
              "border-custom-neutral-300 dark:border-custom-neutral-600": !error,
              "border-red-500": error,
            }
          )}
          {...props}
        />
        {error && (
          <span className="font-normal text-red-500 text-sm">
            {error}
          </span>
        )}

        {showEye && (
          <div className="absolute top-3 right-4 bg-transparent pl-1.5">
            <button
              type="button"
              className="cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
