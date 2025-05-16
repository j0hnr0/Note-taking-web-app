import ClockSvg from "../_svg-components/clock-svg";
import TagSvg from "../_svg-components/tag-svg";
import Button from "./button";

export default function CreateNoteForm() {
  return (
    <form className="h-full py-5 px-6 w-full max-w-[562px] border-r-[1px] border-r-custom-neutral-200">
      <input
        type="text"
        name="title"
        className="w-full text-custom-neutral-950 inter font-bold text-2xl focus:outline-none"
        placeholder="Enter a title..."
      />

      <div className="mt-4 flex justify-start items-center gap-2">
        <div className="w-full max-w-[115px] flex justify-start items-center gap-1.5">
          <TagSvg fill="#2B303B" width="16" height="16" />
          <label
            htmlFor="tags"
            className="text-custom-neutral-700 inter font-normal text-sm"
          >
            Tags
          </label>
        </div>
        <input
          type="text"
          id="tags"
          name="tags"
          className="w-full text-custom-neutral-950 inter font-normal text-sm rounded-sm"
          placeholder="Add tags separated by commas (e.g. Work, Planning)"
        />
      </div>

      <div className="mt-3 flex justify-start items-center gap-2">
        <div className="w-full max-w-[115px] flex justify-start items-center gap-1.5">
          <ClockSvg fill="#2B303B" width="16" height="16" />
          <label
            htmlFor="last-edited"
            className="text-custom-neutral-700 inter font-normal text-sm"
          >
            Last edited
          </label>
        </div>
        <input
          type="text"
          id="last-edited"
          name="last-edited"
          className="w-full text-custom-neutral-950 inter font-normal text-sm rounded-sm"
          placeholder="Not yet saved"
          disabled
        />
      </div>

      <hr className="mt-4 w-full h-[1px] border-custom-neutral-200" />

      <textarea
        className="mt-4 w-full h-full resize-none text-custom-neutral-700 inter font-normal text-sm focus:outline-none"
        placeholder="Start typing your note here..."
      ></textarea>

      <hr className="mt-4 w-full h-[1px] border-custom-neutral-200 " />

      <div className="mt-4 flex justify-start gap-4">
        <Button type="submit" btnText="Save Note" textColor="text-white" bgColor="bg-custom-blue-500" maxWidth="max-w-[99px]" />
        <Button type="button" btnText="Cancel" textColor="text-custom-neutral-600" bgColor="bg-custom-neutral-100" maxWidth="max-w-[78px]" />
      </div>
    </form>
  );
}
