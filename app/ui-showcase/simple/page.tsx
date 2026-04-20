export default function SimpleShowcase() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">Simple UI Showcase</h1>
      
      <div className="w-full max-w-2xl space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Basic Components</h2>
          <div className="space-y-4">
            <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
              Full Width Button
            </button>
            <div className="border rounded-lg p-4">
              <p>This is a simple bordered container with some text content.</p>
            </div>
            <input
              type="text"
              placeholder="Simple input field"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </section>
      </div>
    </main>
  )
} 