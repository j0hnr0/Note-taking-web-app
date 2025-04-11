import AuthFooter from "./_universal-components/auth-footer";
import AuthForm from "./_universal-components/auth-form";
import AuthGoogleBtn from "./_universal-components/auth-google-btn";
import AuthHeader from "./_universal-components/auth-header";

export default function Home() {

  return (
    <section
      className="bg-custom-neutral-100 h-screen flex justify-center items-center
    max-custom-sm:px-5"
    >
      <div
        className="w-full max-w-[540px] mx-auto p-12 bg-white rounded-xl filter drop-shadow-[0_8px_12px_rgba(240,240,240,0.6)] border-[1px] border-custom-neutral-200
          max-custom-md:px-8
          max-custom-sm:py-10 max-custom-sm:px-4"
      >
        <AuthHeader
          title="Welcome to Note"
          subTitle="Please log in to continue"
        />
        <AuthForm />
        <AuthFooter/>
      </div>
    </section>
  );
}
