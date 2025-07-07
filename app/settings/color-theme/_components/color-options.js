import Theme from "./theme";

export default function ColorOptions() {
  return (
    <form className="flex flex-col h-full py-5 px-6 w-full max-w-[562px] border-r-[1px] border-r-custom-neutral-200">
      <small className="inter font-semibold text-base text-custom-neutral-950">
        Color Theme
      </small>
      <small className="mt-1 inter font-normal text-sm text-custom-neutral-700">
        Choose your color theme:
      </small>

      <Theme  />
    </form>
  );
}
