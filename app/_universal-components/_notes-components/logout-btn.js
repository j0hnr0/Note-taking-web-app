export default function LogoutBtn({ svg: Svg, children }) {
  return (
    <button type="button" className="w-full px-3 py-2.5 rounded-lg flex justify-start items-center gap-2">
      <Svg fill="#2B303B" />
      <span className="inter font-medium text-sm text-custom-neutral-950">
        {children}
      </span>
    </button>
  );
}
