export default function NoteSettingsBtn({ svg: Svg, text }) {
  return (
    <button
      type="button"
      className="w-full rounded-lg py-3 px-4 flex justify-start items-center gap-2 border-[1px] border-custom-neutral-300"
    >
      <Svg fill="#2B303B" />
      <span className="block inter font-medium text-sm text-custom-neutral-950">
        {text}
      </span>
    </button>
  );
}
