import Logo from "./logo";

export default function ForgotHeader() {
  return (
    <>
      <div className="flex justify-center items-center">
        <Logo />
      </div>
      <div className="text-center mt-4">
        <h1
          className="inter font-bold text-2xl text-custom-neutral-950"
        >
          Forgotten your password?
        </h1>
        <h2
          className="inter font-normal mt-2 text-sm text-custom-neutral-600"
        >
          Enter your email below, and we'll send you a link to reset it.
        </h2>
      </div>
    </>
  );
}
