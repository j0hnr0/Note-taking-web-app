import AuthPasswordInfo from "@/app/_universal-components/_auth-components/auth-password-info";
import Input from "./input";
import ApplyChangesBtn from "../../_components/apply-changes-btn";

export default function ChangePasswordOptions() {
  return (
    <form className="flex flex-col h-full py-5 px-6 w-full max-w-[562px]">
      <small className="inter font-semibold text-base text-custom-neutral-950">
        Change Password
      </small>

      <Input label="Old Password" name="old-password" />

      <Input label="New Password" name="new-password" />
      <AuthPasswordInfo />

      <Input label="Confirm New Password" name="confirm-new-password" />

      <ApplyChangesBtn text="Save Password" />
    </form>
  );
}
