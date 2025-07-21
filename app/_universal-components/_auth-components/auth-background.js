export default function AuthBackground({ children }) {
  return (
    <section
      className="bg-custom-neutral-100 dark:bg-custom-neutral-700 h-screen flex justify-center items-center
        max-custom-sm:px-5"
    >
      <div
        className="w-full max-w-[540px] mx-auto p-12 bg-white dark:bg-custom-neutral-950 rounded-xl filter drop-shadow-[0_8px_12px_rgba(240,240,240,0.6)] dark:drop-shadow-none border-[1px] border-custom-neutral-200 dark:border-custom-neutral-800
              max-custom-md:px-8
              max-custom-sm:py-10 max-custom-sm:px-4"
      >
        {children}
      </div>
    </section>
  );
}
