
import Logo from "./logo";

export default function LoginHeader() {
  return (
    <>
      <div className="flex justify-center items-center">
        <Logo/>
      </div>
      <div className="text-center mt-4">
        <h1
          className="inter font-bold text-2xl text-custom-neutral-950"
        >
          Welcome to Note
        </h1>
        <h2
          className="inter font-normal mt-2 text-sm text-custom-neutral-600"
        >
          Please log in to continue
        </h2>
      </div>
    </>
  );
}
