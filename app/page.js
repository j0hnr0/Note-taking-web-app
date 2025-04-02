"use client";

import { useContext } from "react";
import ForgotPassword from "./_components/forgot-password";
import Login from "./_components/login";
import { DataContext } from "./_context/DataContext";

export default function Home() {
  const { isForgotClicked } = useContext(DataContext);

  return (
    <section
      className="bg-custom-neutral-100 h-screen flex justify-center items-center
    max-custom-475px:px-5"
    >
      {isForgotClicked ? <ForgotPassword /> : <Login />}
    </section>
  );
}
