import Logo from "@/app/_components/logo";

export default function ResetHeader() {
  return (
    <>
      <div className="flex justify-center items-center">
        <Logo />
      </div>
      <div className="text-center mt-4">
        <h1
          className="inter font-bold text-2xl text-custom-neutral-950"
        >
          Reset Your Password
        </h1>
        <h2
          className="inter font-normal mt-2 text-sm text-custom-neutral-600"
        >
          Choose a new password to secure your account.
        </h2>
      </div>
    </>
  );
}
