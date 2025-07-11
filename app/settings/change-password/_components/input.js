"use client";

import EyeIcon from "@/app/_universal-components/_svg-components/eye-icon";
import EyeSlashIcon from "@/app/_universal-components/_svg-components/eye-slash-icon";
import clsx from "clsx";
import { useState } from "react";

export default function Input({ label, name, ref, error, ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  const passwordInputType = showPassword ? "text" : "password";

  function handleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  return (
    <>
      <label
        htmlFor={name}
        className="mt-6 text-custom-neutral-950 inter font-medium text-sm"
      >
        {label}
      </label>

      <div
        className={clsx(
          `relative mt-1.5 w-full max-w-[528px] rounded-lg border-[1px]`,
          {
            "border-custom-neutral-300": !error,
            "border-red-500": error,
          }
        )}
      >
        <input
          id={name}
          name={name}
          type={passwordInputType}
          ref={ref}
          className="w-full h-full py-3 px-4 focus:outline-none"
          {...props}
        />

        <div className="absolute top-3 right-4 bg-transparent">
          <button
            type="button"
            className="cursor-pointer"
            onClick={handleShowPassword}
          >
            {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
          </button>
        </div>
      </div>
      {error && (
        <small className="block inter font-normal text-red-500 text-sm">
          {error}
        </small>
      )}
    </>
  );
}
