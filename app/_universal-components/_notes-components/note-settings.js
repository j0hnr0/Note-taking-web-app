import ArchiveSvg from "../_svg-components/archive-svg";
import DeleteSvg from "../_svg-components/delete-svg";
import RestoreSvg from "../_svg-components/restore-svg";
import NoteSettingsBtn from "./note-settings-btn";

export default function NoteSettings({ id, isInArchivedNotes }) {
  return (
    <div className="w-full max-w-[290px] max-custom-md:max-w-full p-5 flex flex-col gap-3 max-custom-sm:order-2">
      <NoteSettingsBtn
        id={id}
        svg={isInArchivedNotes ? RestoreSvg : ArchiveSvg}
        text={isInArchivedNotes ? "Restore Note" : "Archive Note"}
      />
      <NoteSettingsBtn
        id={id}
        svg={DeleteSvg}
        text="Delete Note"
        isInArchivedNotes={isInArchivedNotes}
      />
    </div>
  );
}
