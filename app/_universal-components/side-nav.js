import Logo from "./logo";

export default function SideNav() {
  return (
    <aside className="w-full max-w-[272px] h-screen px-4 pt-6 border-[1px] border-r-custom-neutral-200">
        <Logo />
      <nav></nav>
    </aside>
  );
}
