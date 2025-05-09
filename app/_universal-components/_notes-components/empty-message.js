export default function EmptyMessage({ message }) {
  return (
    <div className="mt-4 w-full p-2 rounded-lg bg-custom-neutral-100 border-[1px] border-custom-neutral-200">
      <p className="inter font-normal text-sm text-custom-neutral-950">
        {message}
      </p>
    </div>
  );
}
