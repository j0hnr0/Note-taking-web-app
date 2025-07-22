import AuthGoogleBtn from "./auth-google-btn";
import Link from "next/link";

export default function AuthFooter({ isLoginPage }) {
  return (
    <>
      <hr className="mt-4 w-full border-custom-neutral-300 border-t-[1px]" />
      <div className="mt-6 text-center">
        <h5 className="inter font-normal text-sm text-custom-neutral-600 dark:text-custom-neutral-300">
          Or log in with:
        </h5>
      </div>
      <AuthGoogleBtn />
      <hr className="mt-4 w-full border-custom-neutral-300 border-t-[1px]" />
      <div className="mt-4 text-center">
        <h5 className="inter font-normal text-sm text-custom-neutral-600 dark:text-custom-neutral-300">
          {isLoginPage ? `No account yet? ${" "}` : `Already have an account? ${" "}`}

          <span className="text-custom-neutral-950 dark:text-white">
            <Link href={isLoginPage ? "/signup" : "/"}>
              {isLoginPage ? "Sign Up" : "Login"}
            </Link>
          </span>
        </h5>
      </div>
    </>
  );
}
