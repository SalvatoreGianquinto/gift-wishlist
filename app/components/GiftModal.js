"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function GiftModal({ isOpen, onClose, type, initialData }) {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [store, setStore] = useState("")
  const [link, setLink] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)

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
      setFile(null)
    }
  }, [initialData, isOpen])

  const uploadImage = async (file) => {
    const fileExt = file.name.split(".").pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${fileName}`

    const { error: uploadError } = await supabase.storage
      .from("gift-images")
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data } = supabase.storage.from("gift-images").getPublicUrl(filePath)

    return data.publicUrl
  }

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUploading(true)

    try {
      let finalImageUrl = imageUrl

      if (file) {
        finalImageUrl = await uploadImage(file)
      }

      const giftData = {
        title: title,
        price: parseFloat(price) || 0,
        store: store,
        link: link,
        image_url: finalImageUrl,
        type: isEditing ? initialData.type : type,
      }

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
      alert("Errore durante il salvataggio: " + error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-100 flex items-start md:items-center justify-center p-4 overflow-y-auto pt-24 md:pt-0">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div
        className={`relative w-[calc(100vw-40px)] md:max-w-md bg-white rounded-4xl p-6 md:p-8 shadow-2xl font-mono border-4 mb-10 md:mb-0 ${
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
              className={`w-full bg-slate-100 border-b-2 rounded-t-xl p-3 md:p-4 outline-none text-sm text-black ${
                isHim
                  ? "border-blue-200 focus:border-blue-500"
                  : "border-pink-200 focus:border-pink-500"
              }`}
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-[9px] uppercase tracking-widest font-bold text-slate-400 ml-2">
                Prezzo (€)
              </label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={`w-full bg-slate-100 border-b-2 rounded-t-xl p-3 md:p-4 outline-none text-sm text-black ${
                  isHim
                    ? "border-blue-200 focus:border-blue-500"
                    : "border-pink-200 focus:border-pink-500"
                }`}
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
                className={`w-full bg-slate-100 border-b-2 rounded-t-xl p-3 md:p-4 outline-none text-sm text-black ${
                  isHim
                    ? "border-blue-200 focus:border-blue-500"
                    : "border-pink-200 focus:border-pink-500"
                }`}
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
              className={`w-full bg-slate-100 border-b-2 rounded-t-xl p-3 md:p-4 outline-none text-sm text-black ${
                isHim
                  ? "border-blue-200 focus:border-blue-500"
                  : "border-pink-200 focus:border-pink-500"
              }`}
            />
          </div>

          <div>
            <label className="text-[9px] uppercase tracking-widest font-bold text-slate-400 ml-2">
              Foto Oggetto
            </label>
            <div className="mt-1">
              <label
                className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                  isHim
                    ? "border-blue-200 bg-blue-50/30 hover:bg-blue-50"
                    : "border-pink-200 bg-pink-50/30 hover:bg-pink-50"
                }`}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className={`w-8 h-8 mb-2 ${
                      isHim ? "text-blue-400" : "text-pink-400"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-[10px] font-bold uppercase tracking-tighter text-slate-500">
                    {file ? file.name : "Carica o scatta foto"}
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
            </div>
          </div>

          <button
            disabled={uploading}
            type="submit"
            className={`w-full py-3 md:py-4 rounded-xl font-black uppercase tracking-widest text-white text-xs md:text-sm shadow-lg transition-transform active:scale-95 mt-2 ${
              uploading
                ? "opacity-50 cursor-not-allowed"
                : isHim
                ? "bg-blue-600 shadow-blue-200"
                : "bg-pink-600 shadow-pink-200"
            }`}
          >
            {uploading
              ? "Caricamento..."
              : isEditing
              ? "Salva Modifiche"
              : "Aggiungi alla lista"}
          </button>
        </form>

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-300 hover:text-slate-600"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
