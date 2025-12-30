import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center space-y-8 font-mono">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-3xl shadow-2xl text-white max-w-lg">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
          I nostri desideri.
        </h1>
        <p className="text-lg text-white/80">A portata di click.</p>
      </div>
    </div>
  )
}
