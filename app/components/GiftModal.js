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
      title: title, // Corretto: usiamo la variabile dello stato 'title'
      price: parseFloat(price) || 0,
      store: store,
      link: link,
      image_url: imageUrl, // Corretto: usiamo 'imageUrl'
      type: type, // Usiamo 'type' che ricevi come prop (him o her)
    }

    const { data, error } = await supabase
      .from("gifts")
      .insert([giftData])
      .select() // Ti restituisce il dato appena creato

    if (error) {
      console.error("Errore durante l'invio:", error.message)
      alert("Errore: " + error.message)
    } else {
      console.log("Regalo salvato!", data)
      // Reset dei campi
      setTitle("")
      setPrice("")
      setStore("")
      setLink("")
      setImageUrl("")
      onClose() // Chiude il modal dopo il successo
    }
  }

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-6">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div
        className={`relative w-full max-w-md bg-white rounded-[2.5rem] p-8 shadow-2xl transition-all font-mono border-4 ${
          isHim ? "border-blue-500" : "border-pink-500"
        }`}
      >
        <h2
          className={`text-2xl font-black uppercase tracking-tighter mb-6 ${
            isHim ? "text-blue-600" : "text-pink-600"
          }`}
        >
          Nuovo Desiderio
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 ml-2">
              Nome Oggetto
            </label>
            <input
              required
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full bg-slate-100 border-b-2 rounded-t-2xl p-4 outline-none transition-all text-black
                ${
                  isHim
                    ? "border-blue-200 focus:border-blue-500 focus:bg-blue-50/50"
                    : "border-pink-200 focus:border-pink-500 focus:bg-pink-50/50"
                }`}
              placeholder="es. Cuffie Wireless"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 ml-2">
                Prezzo (€)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={`w-full bg-slate-100 border-b-2 rounded-t-2xl p-4 outline-none transition-all text-black
                ${
                  isHim
                    ? "border-blue-200 focus:border-blue-500 focus:bg-blue-50/50"
                    : "border-pink-200 focus:border-pink-500 focus:bg-pink-50/50"
                }`}
                placeholder="0.00"
              />
            </div>
            <div className="flex-1">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 ml-2">
                Store
              </label>
              <input
                type="text"
                value={store}
                onChange={(e) => setStore(e.target.value)}
                className={`w-full bg-slate-100 border-b-2 rounded-t-2xl p-4 outline-none transition-all text-black
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
            <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 ml-2">
              Link Prodotto
            </label>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className={`w-full bg-slate-100 border-b-2 rounded-t-2xl p-4 outline-none transition-all text-black
                ${
                  isHim
                    ? "border-blue-200 focus:border-blue-500 focus:bg-blue-50/50"
                    : "border-pink-200 focus:border-pink-500 focus:bg-pink-50/50"
                }`}
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest font-bold text-slate-400 ml-2">
              URL Immagine
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className={`w-full bg-slate-100 border-b-2 rounded-t-2xl p-4 outline-none transition-all text-black
                ${
                  isHim
                    ? "border-blue-200 focus:border-blue-500 focus:bg-blue-50/50"
                    : "border-pink-200 focus:border-pink-500 focus:bg-pink-50/50"
                }`}
              placeholder="Incolla link immagine prodotto"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-white shadow-lg transition-transform active:scale-95 mt-4 ${
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
          className="absolute top-6 right-6 text-slate-300 hover:text-slate-600 transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
