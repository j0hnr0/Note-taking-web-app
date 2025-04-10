import LoginGoogleBtn from "./login-google-btn";
import Link from "next/link";


export default function LoginFooter() {
  return (
    <>
      <hr className="mt-4 w-full border-custom-neutral-300 border-t-[1px]" />
      <div className="mt-6 text-center">
        <h5
          className="inter font-normal text-sm text-custom-neutral-600"
        >
          Or log in with:
        </h5>
      </div>
      <LoginGoogleBtn />
      <hr className="mt-4 w-full border-custom-neutral-300 border-t-[1px]" />
      <div className="mt-4 text-center">
        <h5
          className="inter font-normal text-sm text-custom-neutral-600"
        >
          No account yet?{" "}
          <span className="text-custom-neutral-950">
            <Link href="/">Sign Up</Link>
          </span>
        </h5>
      </div>
    </>
  );
}
