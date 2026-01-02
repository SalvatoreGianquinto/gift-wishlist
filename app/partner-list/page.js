/* eslint-disable @next/next/no-img-element */
"use client"

import { useState, useEffect } from "react"
import GiftModal from "../components/GiftModal"
import { supabase } from "@/lib/supabase"

export default function HerListPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [gifts, setGifts] = useState([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)
  const [giftToEdit, setGiftToEdit] = useState(null)

  const fetchGifts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("gifts")
        .select("*")
        .eq("type", "her")
        .order("created_at", { ascending: false })

      if (error) throw error
      setGifts(data || [])
    } catch (error) {
      console.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const deleteGift = async (id) => {
    try {
      const { error } = await supabase.from("gifts").delete().eq("id", id)
      if (error) throw error
      setGifts(gifts.filter((gift) => gift.id !== id))
      setDeletingId(null)
    } catch (error) {
      console.error(error.message)
    }
  }

  const openEditModal = (gift) => {
    setGiftToEdit(gift)
    setIsModalOpen(true)
  }

  useEffect(() => {
    fetchGifts()
  }, [])

  return (
    <main className="max-w-5xl mx-auto pt-28 pb-16 px-6 min-h-screen">
      <header className="mb-16 text-center md:text-left">
        <div className="inline-block px-4 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 mb-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-pink-600 font-bold">
            I suoi desideri
          </p>
        </div>
        <h1 className="font-bold text-5xl md:text-6xl bg-linear-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent font-mono tracking-tighter uppercase">
          Lista per lei
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="group relative border-2 border-dashed border-pink-200 hover:border-pink-500 transition-all rounded-[2.5rem] flex flex-col items-center justify-center p-8 min-h-87.5 bg-white/5 hover:bg-white/20"
        >
          <div className="w-16 h-16 rounded-full bg-pink-500 text-white flex items-center justify-center text-3xl shadow-lg shadow-pink-200 group-hover:scale-110 transition-transform">
            +
          </div>
          <span className="mt-4 font-mono text-xs uppercase tracking-widest text-pink-600 font-bold">
            Nuovo Desiderio
          </span>
        </button>

        {gifts.map((gift) => (
          <div
            key={gift.id}
            className="group relative bg-white/40 backdrop-blur-md border border-white/40 rounded-[2.5rem] p-4 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
          >
            <div className="absolute top-6 left-6 z-20">
              {deletingId === gift.id ? (
                <div className="flex gap-2 animate-in fade-in zoom-in duration-300">
                  <button
                    onClick={() => deleteGift(gift.id)}
                    className="px-3 py-1.5 bg-red-500 text-white text-[9px] font-black uppercase rounded-full shadow-lg hover:bg-red-600 transition-all active:scale-95"
                  >
                    Elimina
                  </button>
                  <button
                    onClick={() => setDeletingId(null)}
                    className="px-3 py-1.5 bg-slate-800 text-white text-[9px] font-black uppercase rounded-full shadow-lg hover:bg-slate-900 transition-all active:scale-95"
                  >
                    No
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  {/* Tasto Elimina */}
                  <button
                    onClick={() => setDeletingId(gift.id)}
                    className="w-9 h-9 bg-white/90 backdrop-blur-sm text-slate-400 rounded-full flex items-center justify-center shadow-md transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>

                  {/* Tasto Modifica */}
                  <button
                    onClick={() => {
                      setGiftToEdit(gift)
                      setIsModalOpen(true)
                    }}
                    className="w-9 h-9 bg-white/90 backdrop-blur-sm text-slate-400 rounded-full flex items-center justify-center shadow-md transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>

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
              <p className="text-[10px] uppercase tracking-widest text-pink-600 font-bold mb-1">
                {gift.store}
              </p>
              <h3 className="text-lg font-bold text-slate-800 uppercase tracking-tighter leading-tight h-12 line-clamp-2 mb-4">
                {gift.title}
              </h3>

              <a
                href={gift.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 text-slate-800 rounded-2xl font-mono text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-pink-600 hover:text-white hover:border-pink-600 transition-all shadow-sm"
              >
                Vedi Prodotto
              </a>
            </div>
          </div>
        ))}
      </div>

      <GiftModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setGiftToEdit(null)
          fetchGifts()
        }}
        type="him"
        initialData={giftToEdit}
      />
    </main>
  )
}
