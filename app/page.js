export default function Home() {
  return (
    <div className="flex flex-col items-center text-center px-4 font-mono">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 md:p-12 rounded-4xl shadow-2xl text-white w-full max-w-md md:max-w-lg transition-transform hover:scale-[1.02]">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tighter leading-tight">
          I nostri <br className="md:hidden" /> desideri.
        </h1>
        <p className="text-base md:text-lg text-white/80 font-light tracking-wide">
          A portata di click.
        </p>
        <div className="mt-8 h-px w-12 bg-white/30 mx-auto"></div>
      </div>
    </div>
  )
}
