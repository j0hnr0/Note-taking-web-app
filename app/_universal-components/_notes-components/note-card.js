export default function NoteCard({ title, tags, date }) {
  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="w-full p-2 rounded-md bg-custom-neutral-100">
      <h5 className="inter font-semibold text-base text-custom-neutral-950">
        {title}
      </h5>

      <div className="flex justify-start gap-1">
        {tags &&
          tags.map((tag, index) => (
            <div
              key={index}
              className="w-min mt-3 py-0.5 px-1.5 text-center rounded-sm bg-custom-neutral-200"
            >
              <span className="inter font-normal text-xs text-custom-neutral-950 block">
                {tag}
              </span>
            </div>
          ))}
      </div>

      <span className="mt-3 inter font-normal text-xs text-custom-neutral-700">
        {formattedDate}
      </span>
    </div>
  );
}
