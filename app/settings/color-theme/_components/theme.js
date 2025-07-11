export default function Theme({ svg: Svg, title, subtitle, name }) {
  return (
    <label className="mt-4 w-full max-w-[528px] rounded-xl border-[1px] border-custom-neutral-200 p-4 flex justify-between items-center cursor-pointer has-[:checked]:bg-custom-neutral-100">
      <input type="radio" name={name} className="peer sr-only" />

      <div className="flex justify-start items-center gap-4">
        <div className="rounded-xl bg-white border-[1px] border-custom-neutral-200 p-2">
          <Svg />
        </div>

        <div>
          <strong className="inter font-medium text-sm text-custom-neutral-950">
            {title}
          </strong>
          <small className="block mt-1.5 inter font-normal text-xs text-custom-neutral-700-700">
            {subtitle}
          </small>
        </div>
      </div>

      <div className="w-4 h-4 rounded-full border-2 border-custom-neutral-200 peer-checked:border-custom-blue-500 peer-checked:bg-custom-blue-500 relative transition-[border-color,background-color] duration-300 ease-in-out">
        <div className="absolute inset-0 m-0.5 bg-white rounded-full"></div>
      </div>
    </label>
  );
}
