export default function EmptyMessage({ message }) {
  return (
    <div className="mt-4 w-full p-2 rounded-lg bg-custom-neutral-100 dark:bg-custom-neutral-800 border-[1px] border-custom-neutral-200 dark:border-custom-neutral-700">
      <p className="font-normal text-sm text-custom-neutral-950 dark:text-white">
        {message}
      </p>
    </div>
  );
}
