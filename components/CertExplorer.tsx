"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";

type CertItem = {
  title: string;
  issuer: string;
  year: string;
  image?: string;
  link?: string;
  fit?: "cover" | "contain";
};

type CertGroup = { label: string; note?: string; items: CertItem[] };

const FolderIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
    <path d="M1.8 4.2a1 1 0 0 1 1-1h3.2l1.4 1.6h5.8a1 1 0 0 1 1 1V12a1 1 0 0 1-1 1H2.8a1 1 0 0 1-1-1V4.2z" />
  </svg>
);

const FileIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
    <path d="M4.2 1.8h4.4l3 3v9a1 1 0 0 1-1 1H4.2a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1z" />
    <path d="M8.6 1.8v3h3" />
  </svg>
);

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export function CertExplorer({
  groups,
  verifyLabel,
  emptyLabel,
}: {
  groups: CertGroup[];
  verifyLabel: string;
  emptyLabel: string;
}) {
  const [active, setActive] = useState(0);
  const group = groups[Math.min(active, groups.length - 1)];

  if (!groups.length) {
    return <p className="cx-empty">{emptyLabel}</p>;
  }

  return (
    <Reveal>
      <div className="cx">
        <div className="cx-bar">
          <span className="cx-dots" aria-hidden>
            <i />
            <i />
            <i />
          </span>
          <span className="cx-path">sertifikat/{slug(group.label)}</span>
        </div>
        <div className="cx-body">
          <nav className="cx-dirs" aria-label="Folder sertifikat">
            {groups.map((g, i) => (
              <button
                type="button"
                key={i}
                className={`cx-dir${i === active ? " is-on" : ""}`}
                onClick={() => setActive(i)}
              >
                <FolderIcon />
                <span className="cx-dir-name">{g.label}</span>
                <span className="cx-count">{g.items.length + (g.note ? 1 : 0)}</span>
              </button>
            ))}
          </nav>
          <ul className="cx-files">
            {group.items.map((c) => (
              <li
                key={c.title}
                className="ct-file"
                role="button"
                tabIndex={0}
                data-src={c.image}
                data-cap={`${c.title} — ${c.issuer} · ${c.year}`}
                data-href={c.link}
                data-vlabel={verifyLabel}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.currentTarget.click();
                  }
                }}
              >
                <FileIcon />
                <span className="cx-name">{c.title}</span>
                <span className="cx-meta">
                  {c.issuer} · {c.year}
                </span>
                {c.link ? (
                  <a className="cx-verify" href={c.link} target="_blank" rel="noreferrer">
                    {verifyLabel} ↗
                  </a>
                ) : null}
              </li>
            ))}
            {group.note ? (
              <li className="ct-file is-pending">
                <FileIcon />
                <span className="cx-name">{group.note}</span>
                <span className="cx-meta">pending</span>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
