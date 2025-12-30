"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function GiftModal({ isOpen, onClose, type }) {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [store, setStore] = useState("")
  const [link, setLink] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  if (!isOpen) return null
  const isHim = type === "him"

  const handleSubmit = async (e) => {
    e.preventDefault()

    const giftData = {
      title: title,
      price: parseFloat(price) || 0,
      store: store,
      link: link,
      image_url: imageUrl,
      type: type,
    }

    const { data, error } = await supabase
      .from("gifts")
      .insert([giftData])
      .select()

    if (error) {
      console.error("Errore durante l'invio:", error.message)
      alert("Errore: " + error.message)
    } else {
      console.log("Regalo salvato!", data)

      setTitle("")
      setPrice("")
      setStore("")
      setLink("")
      setImageUrl("")
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start md:items-center justify-center p-4 overflow-y-auto pt-24 md:pt-0">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div
        className={`relative w-[calc(100vw-40px)] md:max-w-md bg-white rounded-[2rem] p-6 md:p-8 shadow-2xl transition-all font-mono border-4 mb-10 md:mb-0 ${
          isHim ? "border-blue-500" : "border-pink-500"
        }`}
      >
        <h2
          className={`text-xl md:text-2xl font-black uppercase tracking-tighter mb-4 ${
            isHim ? "text-blue-600" : "text-pink-600"
          }`}
        >
          Nuovo Desiderio
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
          <div>
            <label className="text-[9px] uppercase tracking-widest font-bold text-slate-400 ml-2">
              Nome Oggetto
            </label>
            <input
              required
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full bg-slate-100 border-b-2 rounded-t-xl p-3 md:p-4 outline-none transition-all text-sm text-black
                ${
                  isHim
                    ? "border-blue-200 focus:border-blue-500 focus:bg-blue-50/50"
                    : "border-pink-200 focus:border-pink-500 focus:bg-pink-50/50"
                }`}
              placeholder="es. Cuffie Wireless"
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-[9px] uppercase tracking-widest font-bold text-slate-400 ml-2">
                Prezzo (€)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={`w-full bg-slate-100 border-b-2 rounded-t-xl p-3 md:p-4 outline-none transition-all text-sm text-black
                ${
                  isHim
                    ? "border-blue-200 focus:border-blue-500 focus:bg-blue-50/50"
                    : "border-pink-200 focus:border-pink-500 focus:bg-pink-50/50"
                }`}
                placeholder="0.00"
              />
            </div>
            <div className="flex-1">
              <label className="text-[9px] uppercase tracking-widest font-bold text-slate-400 ml-2">
                Store
              </label>
              <input
                type="text"
                value={store}
                onChange={(e) => setStore(e.target.value)}
                className={`w-full bg-slate-100 border-b-2 rounded-t-xl p-3 md:p-4 outline-none transition-all text-sm text-black
                ${
                  isHim
                    ? "border-blue-200 focus:border-blue-500 focus:bg-blue-50/50"
                    : "border-pink-200 focus:border-pink-500 focus:bg-pink-50/50"
                }`}
                placeholder="es. Amazon"
              />
            </div>
          </div>

          <div>
            <label className="text-[9px] uppercase tracking-widest font-bold text-slate-400 ml-2">
              Link Prodotto
            </label>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className={`w-full bg-slate-100 border-b-2 rounded-t-xl p-3 md:p-4 outline-none transition-all text-sm text-black
                ${
                  isHim
                    ? "border-blue-200 focus:border-blue-500 focus:bg-blue-50/50"
                    : "border-pink-200 focus:border-pink-500 focus:bg-pink-50/50"
                }`}
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="text-[9px] uppercase tracking-widest font-bold text-slate-400 ml-2">
              URL Immagine
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className={`w-full bg-slate-100 border-b-2 rounded-t-xl p-3 md:p-4 outline-none transition-all text-sm text-black
                ${
                  isHim
                    ? "border-blue-200 focus:border-blue-500 focus:bg-blue-50/50"
                    : "border-pink-200 focus:border-pink-500 focus:bg-pink-50/50"
                }`}
              placeholder="Incolla link immagine"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 md:py-4 rounded-xl font-black uppercase tracking-widest text-white text-xs md:text-sm shadow-lg transition-transform active:scale-95 mt-2 ${
              isHim
                ? "bg-blue-600 shadow-blue-200"
                : "bg-pink-600 shadow-pink-200"
            }`}
          >
            Aggiungi alla lista
          </button>
        </form>

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-300 hover:text-slate-600 transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
