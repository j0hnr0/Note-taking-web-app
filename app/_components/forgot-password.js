import ForgotForm from "./forgot-form";
import ForgotHeader from "./forgot-header";

export default function ForgotPassword() {
  return (
    <div
      className="w-full max-w-[540px] mx-auto p-12 bg-white rounded-xl filter drop-shadow-[0_8px_12px_rgba(240,240,240,0.6)] border-[1px] border-custom-neutral-200
    max-custom-768px:px-8
    max-custom-475px:py-10 max-custom-475px:px-4"
    >
      <ForgotHeader />
      <ForgotForm />
    </div>
  );
}
