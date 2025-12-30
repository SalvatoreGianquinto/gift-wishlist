export default function PartnerListPage() {
  return (
    <main className="max-w-2xl mx-auto mt-10 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Lista Manuela</h1>
        <p className="text-gray-500">
          Tutte le cose che mi piacerebbe ricevere.
        </p>
      </header>

      <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl h-40 flex items-center justify-center text-gray-400">
        In caricamento dal database...
      </div>
    </main>
  )
}
