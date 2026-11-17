import Link from "next/link";

export default function RootPage() {
  return (
    <html lang="id">
      <head>
        <meta httpEquiv="refresh" content="0; url=/id/" />
        <script
          dangerouslySetInnerHTML={{ __html: "location.replace('/id/')" }}
        />
        <title>Rayendra Aldo Putra</title>
        <style>{`
          html,body{margin:0;height:100%;background:#0a0a0a;color:#f5f5f5;
            display:flex;align-items:center;justify-content:center;
            font-family:ui-monospace,monospace}
          a{color:#4ade80;text-decoration:none;letter-spacing:.15em;font-size:13px}
        `}</style>
      </head>
      <body>
        <Link href="/id/">MENGALIHKAN…</Link>
      </body>
    </html>
  );
}
