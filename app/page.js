"use client";

import { useRouter } from "next/navigation";
import AuthBackground from "./_universal-components/auth-background";
import AuthFooter from "./_universal-components/auth-footer";
import AuthForm from "./_universal-components/auth-form";
import AuthHeader from "./_universal-components/auth-header";
import { useAuth } from "./contexts/auth-provider";
import { useEffect } from "react";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/all-notes");
    }
  }, [isAuthenticated, router]);

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
