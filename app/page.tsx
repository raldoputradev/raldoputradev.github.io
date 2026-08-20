import Link from "next/link";

// Situs ini diekspor statis, jadi redirect() tidak bisa dipakai: tidak ada server
// yang mengirim status 307. Meta refresh bekerja di hosting statis mana pun.
export default function RootPage() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/id/" />
      <main style={{ padding: "4rem 1.5rem", textAlign: "center" }}>
        <Link href="/id/">Buka situs</Link>
      </main>
    </>
  );
}
