import Logo from "../../_svg-components/logo";

export default function MHeader() {
  return (
    <header
      className="hidden py-6 px-8 bg-custom-neutral-100
  max-custom-lg:block
  max-custom-sm:py-3 max-custom-sm:px-4"
    >
      <Logo />
    </header>
  );
}
