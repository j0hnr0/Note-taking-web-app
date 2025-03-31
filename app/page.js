import ForgotPassword from "./_components/forgot-password";
import Login from "./_components/login";

export default function Home() {
  return (
    <section className="bg-custom-neutral-100 h-screen flex justify-center items-center
    max-custom-475px:px-5">
      <Login />
      <ForgotPassword/>
    </section>
  );
}
