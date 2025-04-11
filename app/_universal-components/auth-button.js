export default function AuthButton({ btnText }) {
  return (
    <div className="mt-4">
      <button
        type="submit"
        className="w-full py-3 text-center bg-custom-blue-500 rounded-lg cursor-pointer"
      >
        <h5 className="inter font-semibold text-base text-white">{btnText}</h5>
      </button>
    </div>
  );
}
