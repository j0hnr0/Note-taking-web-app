import localFont from 'next/font/local'
import Logo from "./_components/logo";

const inter = localFont({
  src: '../public/fonts/inter/static/Inter_18pt-Bold.ttf',
  display: 'swap',
})

export default function Home() {
  return (
    <section className="bg-custom-neutral-100 h-screen flex justify-center items-center">
      <div className="w-full max-w-[540px] mx-auto p-12 bg-white rounded-xl filter drop-shadow-[0_8px_12px_rgba(240,240,240,0.6)] border-[1px] border-custom-neutral-200">
        <div className="flex justify-center items-center">
          <Logo/>
        </div>
        <div className="text-center mt-4">
          <h1 className={`${inter.className} antialiased font-bold text-2xl text-custom-neutral-950`}>
            Welcome to Note
          </h1>
        </div>
      </div>
    </section>
  );
}
