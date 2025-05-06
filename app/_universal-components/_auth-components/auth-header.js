import Logo from "../_svg-components/logo";

export default function AuthHeader({ title, subTitle }) {
  return (
    <>
      <div className="flex justify-center items-center">
        <Logo />
      </div>
      <div className="text-center mt-4">
        <h1 className="inter font-bold text-2xl text-custom-neutral-950 tracking-[-0.5px]">
          {title}
        </h1>
        <h2 className="inter font-normal mt-2 text-sm text-custom-neutral-600 tracking-[-0.2px]">
          {subTitle}
        </h2>
      </div>
    </>
  );
}
