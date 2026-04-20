import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-xl text-center">
        <p className="text-sm font-medium text-amber-600">404</p>
        <h1 className="mt-2 text-3xl font-bold text-zinc-900">Page not found</h1>
        <p className="mt-3 text-zinc-600">The page you requested is unavailable right now. Continue with Book Digitization Platform using the links below.</p>
        <div className="mt-6 flex justify-center gap-3 flex-wrap">
          <Link href="/" className="inline-flex items-center rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white">Go home</Link>
          <Link href="/pricing" className="inline-flex items-center rounded-lg border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-700">View pricing</Link>
          <Link href="/docs" className="inline-flex items-center rounded-lg border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-700">Documentation</Link>
        </div>
      </div>
    </main>
  );
}
