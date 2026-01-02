"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function GiftModal({ isOpen, onClose, type, initialData }) {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [store, setStore] = useState("")
  const [link, setLink] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  const isHim = type === "him"
  const isEditing = !!initialData

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "")
      setPrice(initialData.price || "")
      setStore(initialData.store || "")
      setLink(initialData.link || "")
      setImageUrl(initialData.image_url || "")
    } else {
      setTitle("")
      setPrice("")
      setStore("")
      setLink("")
      setImageUrl("")
    }
  }, [initialData, isOpen])

  if (!isOpen) return null

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

    try {
      if (isEditing) {
        const { error } = await supabase
          .from("gifts")
          .update(giftData)
          .eq("id", initialData.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from("gifts").insert([giftData])
        if (error) throw error
      }

      onClose()
    } catch (error) {
      console.error("Errore:", error.message)
      alert("Errore: " + error.message)
    }
  }

  return (
    <div className="fixed inset-0 z-100 flex items-start md:items-center justify-center p-4 overflow-y-auto pt-24 md:pt-0">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div
        className={`relative w-[calc(100vw-40px)] md:max-w-md bg-white rounded-4xl p-6 md:p-8 shadow-2xl transition-all font-mono border-4 mb-10 md:mb-0 ${
          isHim ? "border-blue-500" : "border-pink-500"
        }`}
      >
        <h2
          className={`text-xl md:text-2xl font-black uppercase tracking-tighter mb-4 ${
            isHim ? "text-blue-600" : "text-pink-600"
          }`}
        >
          {isEditing ? "Modifica Desiderio" : "Nuovo Desiderio"}
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
            {isEditing ? "Salva Modifiche" : "Aggiungi alla lista"}
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
