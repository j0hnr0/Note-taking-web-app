"use client";

import { useRouter } from "next/navigation";
import AuthBackground from "./_universal-components/_auth-components/auth-background";
import AuthFooter from "./_universal-components/_auth-components/auth-footer";
import AuthForm from "./_universal-components/_auth-components/auth-form";
import AuthHeader from "./_universal-components/_auth-components/auth-header";
import { useAuth } from "./contexts/auth-provider";
import { useEffect, useState } from "react";
import AuthSpinner from "./_universal-components/_auth-components/auth-spinner";

export default function Home() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/all-notes");
    }
  }, [isAuthenticated, router]);

  if (loading || isAuthenticated) {
    return <AuthSpinner />;
  }

  return (
    <AuthBackground>
      <AuthHeader
        title="Welcome to Note"
        subTitle="Please log in to continue"
      />
      <AuthForm
        btnText="Login"
        isLoginPage={true}
        createPasswordValidation={false}
      />
      <AuthFooter isLoginPage={true} />
    </AuthBackground>
  );
}
