import ArchiveSvg from "../_svg-components/archive-svg";
import DeleteSvg from "../_svg-components/delete-svg";
import NoteSettingsBtn from "./note-settings-btn";

export default function NoteSettings({ id }) {
  return (
    <div className="w-full max-w-[290px] p-5 flex flex-col gap-3">
      <NoteSettingsBtn svg={ArchiveSvg} text="Archive Note" />
      <NoteSettingsBtn id={id} svg={DeleteSvg} text="Delete Note" />
    </div>
  );
}
