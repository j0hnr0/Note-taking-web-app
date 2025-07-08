export default function ApplyChangesBtn() {
  return (
    <div className="mt-6 w-full max-w-[528px] flex justify-end">
      <button
        type="submit"
        className="w-full max-w-[132px] py-3 text-center rounded-lg bg-custom-blue-500 cursor-pointer"
      >
        <strong className="block inter font-medium text-sm text-white">
          Apply Changes
        </strong>
      </button>
    </div>
  );
}
