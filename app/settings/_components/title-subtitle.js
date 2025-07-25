export default function TitleSubtitle({ title, subtitle }) {
  return (
    <>
      <small className="inter font-semibold text-base text-custom-neutral-950 dark:text-white">
        {title}
      </small>
      <small className="mt-1 mb-3.5 inter font-normal text-sm text-custom-neutral-700 dark:text-custom-neutral-300">
        {subtitle}
      </small>
    </>
  );
}
