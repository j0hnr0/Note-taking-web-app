import EmptyMessage from "../empty-message";

export default function MNotesList() {
  return (
    <section
      className="hidden py-6 px-8
    max-custom-lg:block
    max-custom-sm:py-5 max-custom-md:px-4"
    >
      <h1 className="font-bold text-2xl text-custom-neutral-950">
        All Notes
      </h1>
      <EmptyMessage message="You don’t have any notes yet. Start a new note to capture your thoughts and ideas." />
      <hr className="mt-4 w-full border-t-[1px] border-t-custom-neutral-200"/>
    </section>
  );
}
