import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col justify-center px-5 py-24">
      <p className="font-mono text-xs text-accent">404</p>
      <h1 className="mt-3 font-display text-3xl italic">Halaman tidak ada / Page not found</h1>
      <p className="mt-4 text-sm text-muted">
        <Link href="/id/" className="text-accent hover:underline">
          Bahasa Indonesia
        </Link>
        {" · "}
        <Link href="/en/" className="text-accent hover:underline">
          English
        </Link>
      </p>
    </div>
  );
}
