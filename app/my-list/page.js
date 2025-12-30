/* eslint-disable @next/next/no-img-element */
"use client"

import { useState, useEffect } from "react"
import GiftModal from "../components/GiftModal"
import { supabase } from "@/lib/supabase"

export default function MyListPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [gifts, setGifts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchGifts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("gifts")
        .select("*")
        .eq("type", "him")
        .order("created_at", { ascending: false })

      if (error) throw error
      setGifts(data || [])
    } catch (error) {
      console.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGifts()
  }, [])

  return (
    <main className="max-w-5xl mx-auto pt-28 pb-16 px-6 min-h-screen">
      <header className="mb-16 text-center md:text-left">
        <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-blue-600 font-bold">
            I suoi desideri
          </p>
        </div>
        <h1 className="font-bold text-5xl md:text-6xl bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent font-mono tracking-tighter uppercase">
          Lista per lui
        </h1>
        <p className="text-slate-500 font-mono text-sm mt-4 max-w-md leading-relaxed">
          Una selezione curata di desideri, gadget e ispirazioni.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="group relative border-2 border-dashed border-blue-200 hover:border-blue-500 transition-all rounded-[2.5rem] flex flex-col items-center justify-center p-8 min-h-[350px] bg-white/5 hover:bg-white/20"
        >
          <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-3xl shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
            +
          </div>
          <span className="mt-4 font-mono text-xs uppercase tracking-widest text-blue-600 font-bold">
            Nuovo Desiderio
          </span>
        </button>

        {gifts.map((gift) => (
          <div
            key={gift.id}
            className="group bg-white/40 backdrop-blur-md border border-white/40 rounded-[2.5rem] p-4 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-[1.8rem] bg-slate-100 mb-4">
              <img
                src={gift.image_url}
                alt={gift.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-sm text-white px-3 py-1 rounded-full shadow-lg">
                <p className="font-mono text-xs font-bold">€{gift.price}</p>
              </div>
            </div>

            <div className="px-2 font-mono">
              <div className="flex justify-between items-start mb-1">
                <p className="text-[10px] uppercase tracking-widest text-blue-600 font-bold">
                  {gift.store}
                </p>
              </div>
              <h3 className="text-lg font-bold text-slate-800 uppercase tracking-tighter leading-tight h-12 line-clamp-2">
                {gift.title}
              </h3>

              <a
                href={gift.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 text-slate-800 rounded-2xl font-mono text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm"
              >
                Vedi Prodotto
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>

      <GiftModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          fetchGifts()
        }}
        type="him"
      />
    </main>
  )
}
