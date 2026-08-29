"use client";

import { useEffect, useId, useState } from "react";
import { DownloadIcon } from "./Icons";

export function CvSoonButton({ label, soon }: { label: string; soon: string }) {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button type="button" className="btn btn-cv-soon" onClick={() => setOpen(true)}>
        <DownloadIcon />
        {label}
      </button>
      {open ? (
        <div className="cv-soon-layer" role="presentation" onClick={() => setOpen(false)}>
          <div
            className="cv-soon-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(event) => event.stopPropagation()}
          >
            <p id={titleId} className="cv-soon-title">
              {soon}
            </p>
            <p className="cv-soon-copy">{label}</p>
            <button type="button" className="btn btn-primary" onClick={() => setOpen(false)}>
              OK
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
