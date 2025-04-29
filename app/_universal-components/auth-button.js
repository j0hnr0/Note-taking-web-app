export default function AuthButton({ btnText, isLoading }) {
  return (
    <div className="mt-4">
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 text-center bg-custom-blue-500 rounded-lg cursor-pointer"
      >
        <h5 className="inter font-semibold text-base text-white">
          {isLoading ? (
            <span className="mr-2 inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            btnText
          )}
        </h5>
      </button>
    </div>
  );
}
