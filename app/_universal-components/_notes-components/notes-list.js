import Button from "./button";
import EmptyMessage from "./empty-message";

export default function NotesList() {
  return (
    <div className="max-w-[290px] py-5 px-8 border-r-[1px] border-r-custom-neutral-200 h-full">
      <Button type="button" btnText="+ Create New Note" textColor="text-white" bgColor="bg-custom-blue-500" />
      <EmptyMessage message="You don’t have any notes yet. Start a new note to capture your thoughts and ideas." />
    </div>
  );
}
